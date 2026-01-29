import { ImportRecordStatus } from '@account-book/types'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bullmq'
import { Repository } from 'typeorm'
import { ImportRecord } from './entities/import-record.entity'

@Injectable()
export class ImportRecordService {
  constructor(
    @InjectRepository(ImportRecord)
    private importRecordRepository: Repository<ImportRecord>,
    @InjectQueue('import-record')
    private importRecordQueue: Queue,
  ) { }

  async findAll(userId: string, page = 1, limit = 10) {
    const [items, total] = await this.importRecordRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async create(userId: string, fileName: string, fileType: string) {
    const record = this.importRecordRepository.create({
      userId,
      fileName,
      fileType,
      status: ImportRecordStatus.PENDING,
    })
    return this.importRecordRepository.save(record)
  }

  async upload(userId: string, fileName: string, fileType: string, filePath: string) {
    const record = await this.create(userId, fileName, fileType)

    // 将任务加入队列，包含文件路径
    const job = await this.importRecordQueue.add('process-import', {
      recordId: record.id,
      userId,
      fileName,
      fileType,
      filePath,
    })

    console.log(`[Queue Added] JobId: ${job.id} for RecordId: ${record.id}`)

    return record
  }
}
