import { PaginatedResult } from '@account-book/types'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, QueryFailedError, Repository } from 'typeorm'
import { PaginationDto } from '../../common/dto/pagination.dto'
import { TagsService } from '../tags/tags.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Transaction } from './entities/transaction.entity'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly tagsService: TagsService,
  ) { }

  async create(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    try {
      const transaction = this.transactionRepository.create({
        ...createTransactionDto,
        userId,
      })
      return await this.transactionRepository.save(transaction)
    }
    catch (error) {
      if (error instanceof QueryFailedError && error.driverError?.code === '23505') {
        const detail = error.driverError.detail || '唯一键冲突'
        if (detail.includes('transactionOrderNumber')) {
          throw new Error(`交易订单号已存在: ${createTransactionDto.transactionOrderNumber}`)
        }
        else if (detail.includes('merchantOrderNumber')) {
          throw new Error(`商家订单号已存在: ${createTransactionDto.merchantOrderNumber}`)
        }
      }
      throw error
    }
  }

  async findAll(
    userId: string,
    pagination: PaginationDto,
    filters?: {
      startDate?: Date
      endDate?: Date
      type?: string
      counterparty?: string
      tagIds?: string[]
      minAmount?: number
      maxAmount?: number
    },
  ): Promise<PaginatedResult<Transaction> & { totalIncome: number, totalExpense: number }> {
    const { page = 1, limit = 10 } = pagination
    const skip = (page - 1) * limit

    const applyFilters = (qb: any) => {
      qb.where('transaction.userId = :userId', { userId })

      if (filters?.startDate || filters?.endDate) {
        qb.andWhere('transaction.transactionTime BETWEEN :start AND :end', {
          start: filters.startDate || new Date(0),
          end: filters.endDate || new Date('2099-12-31'),
        })
      }

      if (filters?.type) {
        qb.andWhere('transaction.transactionType = :type', { type: filters.type })
      }

      if (filters?.counterparty) {
        qb.andWhere('transaction.counterparty ILIKE :counterparty', { counterparty: `%${filters.counterparty}%` })
      }

      if (filters?.minAmount !== undefined) {
        qb.andWhere('transaction.amount >= :minAmount', { minAmount: filters.minAmount })
      }

      if (filters?.maxAmount !== undefined) {
        qb.andWhere('transaction.amount <= :maxAmount', { maxAmount: filters.maxAmount })
      }

      if (filters?.tagIds && filters.tagIds.length > 0) {
        qb.andWhere((sq: any) => {
          const subQuery = sq.subQuery()
            .select('tt.transactionId')
            .from('transaction_tags', 'tt')
            .where('tt.tagId IN (:...tagIds)', { tagIds: filters.tagIds })
            .getQuery()
          return `transaction.id IN ${subQuery}`
        })
      }
    }

    const queryBuilder = this.transactionRepository.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.tags', 'tag')

    applyFilters(queryBuilder)

    const totals = await this.transactionRepository.createQueryBuilder('transaction')
      .select('SUM(CASE WHEN transaction.transactionType = :income THEN transaction.amount ELSE 0 END)', 'totalIncome')
      .addSelect('SUM(CASE WHEN transaction.transactionType = :expense THEN transaction.amount ELSE 0 END)', 'totalExpense')
      .setParameters({ income: 'income', expense: 'expense' })
      .andWhere(qb => applyFilters(qb))
      .getRawOne()

    const [items, total] = await Promise.all([
      queryBuilder
        .orderBy('transaction.transactionTime', 'DESC')
        .skip(skip)
        .take(limit)
        .getMany(),
      queryBuilder.getCount(),
    ])

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalIncome: Number(totals.totalIncome || 0),
      totalExpense: Number(totals.totalExpense || 0),
    }
  }

  async findOneById(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id, userId } as FindOptionsWhere<Transaction>,
      relations: ['tags'],
    })
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`)
    }
    return transaction
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto, userId: string): Promise<Transaction> {
    const transaction = await this.findOneById(id, userId)
    Object.assign(transaction, updateTransactionDto)
    return this.transactionRepository.save(transaction)
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.transactionRepository.delete({ id, userId })
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`)
    }
  }

  async updateTags(
    id: string,
    tagIds: string[],
    applyToAllSameCounterparty: boolean,
    userId: string,
  ): Promise<Transaction> {
    const transaction = await this.findOneById(id, userId)

    // 查询出需要绑定的所有标签
    const userTags = await this.tagsService.findAllByUser(userId)
    const tagsToApply = userTags.filter(tag => tagIds.includes(tag.id))

    // 使用 relation manager 同步标签，这比 save() 更可靠
    await this.transactionRepository
      .createQueryBuilder()
      .relation(Transaction, 'tags')
      .of(transaction)
      .addAndRemove(tagsToApply, transaction.tags || [])

    // 如果应用到所有同商户记录，则查找该用户下所有 counterparty 相同的记录
    if (applyToAllSameCounterparty && transaction.counterparty) {
      const relatedTransactions = await this.transactionRepository.find({
        where: { userId, counterparty: transaction.counterparty },
        relations: ['tags'],
      })

      for (const t of relatedTransactions) {
        if (t.id !== transaction.id) {
          await this.transactionRepository
            .createQueryBuilder()
            .relation(Transaction, 'tags')
            .of(t)
            .addAndRemove(tagsToApply, t.tags || [])
        }
      }
    }

    return this.findOneById(id, userId)
  }
}
