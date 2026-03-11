import { CreateLedgerDto, QuickAddLedgerTransactionsDto, UpdateLedgerDto } from '@account-book/types'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm'
import { Transaction } from '../transactions/entities/transaction.entity'
import { LedgerTransaction } from './entities/ledger-transaction.entity'
import { Ledger } from './entities/ledger.entity'

@Injectable()
export class LedgersService {
  constructor(
    @InjectRepository(Ledger)
    private ledgerRepository: Repository<Ledger>,
    @InjectRepository(LedgerTransaction)
    private ledgerTransactionRepository: Repository<LedgerTransaction>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) { }

  async create(userId: string, createLedgerDto: CreateLedgerDto): Promise<Ledger> {
    const ledger = this.ledgerRepository.create({
      ...createLedgerDto,
      userId,
    })
    return this.ledgerRepository.save(ledger)
  }

  async findAll(userId: string): Promise<Ledger[]> {
    return this.ledgerRepository.find({ where: { userId } })
  }

  async findOne(userId: string, id: string): Promise<Ledger> {
    const ledger = await this.ledgerRepository.findOne({ where: { id, userId } })
    if (!ledger) {
      throw new NotFoundException('账本未找到')
    }
    return ledger
  }

  async update(userId: string, id: string, updateLedgerDto: UpdateLedgerDto): Promise<Ledger> {
    const ledger = await this.findOne(userId, id)
    Object.assign(ledger, updateLedgerDto)
    return this.ledgerRepository.save(ledger)
  }

  async remove(userId: string, id: string): Promise<void> {
    const ledger = await this.findOne(userId, id)
    await this.ledgerRepository.remove(ledger)
    // 同时删除关联记录
    await this.ledgerTransactionRepository.delete({ ledgerId: id })
  }

  async createDefaultLedgers(userId: string): Promise<void> {
    await this.create(userId, { name: '收入账本', description: '系统自动创建的收入账本' })
    await this.create(userId, { name: '支出账本', description: '系统自动创建的支出账本' })
  }

  async addTransactions(userId: string, ledgerId: string, transactionIds: string[]): Promise<{ added: number, skipped: number }> {
    // 验证账本所属权
    await this.findOne(userId, ledgerId)

    let added = 0
    let skipped = 0

    for (const transactionId of transactionIds) {
      // 检查是否已存在
      const exists = await this.ledgerTransactionRepository.findOne({
        where: { ledgerId, transactionId },
      })

      if (exists) {
        skipped++
        continue
      }

      await this.ledgerTransactionRepository.save({
        ledgerId,
        transactionId,
      })
      added++
    }

    return { added, skipped }
  }

  async quickAdd(userId: string, ledgerId: string, query: QuickAddLedgerTransactionsDto): Promise<{ added: number, skipped: number }> {
    const { merchantNames, tagIds, startDate, endDate } = query
    const where: any = { userId }

    if (merchantNames && merchantNames.length > 0) {
      where.counterparty = In(merchantNames)
    }

    if (startDate && endDate) {
      where.transactionTime = Between(new Date(startDate), new Date(endDate))
    }
    else if (startDate) {
      where.transactionTime = MoreThanOrEqual(new Date(startDate))
    }
    else if (endDate) {
      where.transactionTime = LessThanOrEqual(new Date(endDate))
    }

    // 注意：如果根据 tagIds 加入，逻辑稍微复杂，因为 tags 是 ManyToMany
    // 这里简单处理：如果提供了 tagIds，通过 join 查询
    let transactions: Transaction[] = []
    if (tagIds && tagIds.length > 0) {
      const qb = this.transactionRepository.createQueryBuilder('transaction')
        .leftJoin('transaction.tags', 'tag')
        .where('transaction.userId = :userId', { userId })

      if (merchantNames && merchantNames.length > 0) {
        qb.andWhere('transaction.counterparty IN (:...merchantNames)', { merchantNames })
      }
      if (startDate && endDate) {
        qb.andWhere('transaction.transactionTime BETWEEN :start AND :end', { start: startDate, end: endDate })
      }
      else if (startDate) {
        qb.andWhere('transaction.transactionTime >= :start', { start: startDate })
      }
      else if (endDate) {
        qb.andWhere('transaction.transactionTime <= :end', { end: endDate })
      }
      qb.andWhere('tag.id IN (:...tagIds)', { tagIds })

      transactions = await qb.getMany()
    }
    else {
      transactions = await this.transactionRepository.find({ where })
    }

    const ids = transactions.map(t => t.id)
    return this.addTransactions(userId, ledgerId, ids)
  }

  async getTransactions(userId: string, ledgerId: string): Promise<Transaction[]> {
    await this.findOne(userId, ledgerId)
    const relations = await this.ledgerTransactionRepository.find({
      where: { ledgerId },
    })
    const transactionIds = relations.map(r => r.transactionId)
    if (transactionIds.length === 0)
      return []

    return this.transactionRepository.find({
      where: { id: In(transactionIds) },
      relations: ['tags'],
      order: { transactionTime: 'DESC' },
    })
  }

  async removeTransactions(userId: string, ledgerId: string, transactionIds: string[]): Promise<void> {
    await this.findOne(userId, ledgerId)
    await this.ledgerTransactionRepository.delete({
      ledgerId,
      transactionId: In(transactionIds),
    })
  }
}
