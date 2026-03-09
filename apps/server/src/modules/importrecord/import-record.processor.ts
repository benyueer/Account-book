import type { Job } from 'bullmq'
import type { Repository } from 'typeorm'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { ImportRecordStatus } from '@account-book/types'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In } from 'typeorm'
import { CardsService } from '../cards/cards.service'
import { Transaction } from '../transactions/entities/transaction.entity'
import { ImportRecord } from './entities/import-record.entity'
import { BillParser } from './utils/bill-parser.util'

interface ImportJobData {
  recordId: string
  userId: string
  fileName: string
  fileType: string
  filePath: string
}

interface ImportJobResult {
  success: boolean
  recordId: string
  successCount: number
  failCount: number
}

@Processor('import-record')
export class ImportRecordProcessor extends WorkerHost {
  private readonly logger = new Logger(ImportRecordProcessor.name)

  constructor(
    @InjectRepository(ImportRecord)
    private importRecordRepository: Repository<ImportRecord>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private cardsService: CardsService,
  ) {
    super()
  }

  async process(job: Job<ImportJobData, ImportJobResult, string>): Promise<ImportJobResult> {
    const { recordId, filePath, userId } = job.data
    this.logger.log(`[Task Received] Job: ${job.id}, recordId: ${recordId}, path: ${filePath}`)

    try {
      // 1. 更新为处理中
      await this.importRecordRepository.update(recordId, {
        status: ImportRecordStatus.PENDING,
      })

      // 2. 解析文件
      const absolutePath = join(process.cwd(), filePath)
      const parsedData = BillParser.parse(absolutePath)

      // 3. 查重并保存 Transaction
      const orderNumbers = parsedData.transactions.map(t => t.transactionOrderNumber).filter(Boolean) as string[]

      let existingOrderNumbers = new Set<string>()
      if (orderNumbers.length > 0) {
        const existingTransactions = await this.transactionRepository.find({
          where: {
            transactionOrderNumber: In(orderNumbers),
            userId,
          },
          select: ['transactionOrderNumber'],
        })
        existingOrderNumbers = new Set(existingTransactions.map(t => t.transactionOrderNumber))
      }

      const newTransactions: Transaction[] = []
      for (const t of parsedData.transactions) {
        if (!(t.transactionOrderNumber && !existingOrderNumbers.has(String(t.transactionOrderNumber)))) {
          continue
        }

        let cardId: string | undefined
        if (t.paymentMethod) {
          const card = await this.cardsService.findOrCreateByPaymentMethod(t.paymentMethod, userId)
          if (card) {
            cardId = card.id
          }
        }

        newTransactions.push({
          ...t,
          userId,
          importRecordId: recordId,
          sourceCard: cardId || t.paymentMethod, // 有卡ID则存ID, 否则存原始文字
        } as Transaction)
      }

      if (newTransactions.length > 0) {
        await this.transactionRepository.save(newTransactions)
      }

      // 4. 更新 ImportRecord 统计信息和元数据
      const successCount = newTransactions.length
      const failCount = parsedData.transactions.length - successCount

      await this.importRecordRepository.update(recordId, {
        status: ImportRecordStatus.SUCCESS,
        importTime: new Date(),
        totalCount: parsedData.transactions.length,
        successCount,
        failCount,
        title: parsedData.metadata.title,
        nickname: parsedData.metadata.nickname,
        startTime: parsedData.metadata.startTime,
        endTime: parsedData.metadata.endTime,
        exportTime: parsedData.metadata.exportTime,
        totalIncomeCost: parsedData.metadata.totalIncomeCost,
        totalIncomeCount: parsedData.metadata.totalIncomeCount,
        totalExpenseCost: parsedData.metadata.totalExpenseCost,
        totalExpenseCount: parsedData.metadata.totalExpenseCount,
        billNotes: parsedData.metadata.billNotes,
      })

      this.logger.log(`[Task Completed] Job: ${job.id}, 成功: ${successCount}, 重复/失败: ${failCount}`)

      // 5. 清理临时文件
      await unlink(absolutePath).catch(err => this.logger.error(`无法删除临时文件: ${filePath}`, err))

      return { success: true, recordId, successCount, failCount }
    }
    catch (error) {
      this.logger.error(`[Task Failed] Job: ${job.id}`, error)
      await this.importRecordRepository.update(recordId, {
        status: ImportRecordStatus.FAILED,
        errorMessage: (error as Error).message,
      })
      throw error
    }
  }
}
