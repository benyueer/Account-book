import { PaginatedResult, TransactionType } from '@account-book/types'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindOptionsOrder, FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual, QueryFailedError, Repository } from 'typeorm'
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

    const where: FindOptionsWhere<Transaction> = { userId }

    // 添加日期范围过滤
    if (filters?.startDate || filters?.endDate) {
      where.transactionTime = Between(
        filters.startDate || new Date(0), // 如果没有开始日期，则从最早时间开始
        filters.endDate || new Date(), // 如果没有结束日期，则到现在
      )
    }

    // 添加类型过滤
    if (filters?.type) {
      where.transactionType = filters.type as TransactionType
    }

    // 添加商户过滤 (模糊匹配)
    if (filters?.counterparty) {
      where.counterparty = ILike(`%${filters.counterparty}%`)
    }

    // 添加金额范围过滤
    if (filters?.minAmount !== undefined || filters?.maxAmount !== undefined) {
      if (filters.minAmount !== undefined && filters.maxAmount !== undefined) {
        where.amount = Between(filters.minAmount, filters.maxAmount)
      }
      else if (filters.minAmount !== undefined) {
        where.amount = MoreThanOrEqual(filters.minAmount)
      }
      else if (filters.maxAmount !== undefined) {
        where.amount = LessThanOrEqual(filters.maxAmount)
      }
    }

    // 添加标签过滤 (多选，取交集或并集？通常是包含其中之一或全部。这里实现包含其中之一的情况)
    if (filters?.tagIds && filters.tagIds.length > 0) {
      // ManyToMany 过滤在 TypeORM 中比较特殊，通常需要 join
      // 这里我们先构建基础查询，如果是复杂多条件组合，用 QueryBuilder 更好
      // 但对于简单的 where 对象，如果涉及 ManyToMany，可以直接在 find 里的 where 用 tags: { id: In(tagIds) }
    }

    const order: FindOptionsOrder<Transaction> = { transactionTime: 'DESC' }

    // 使用库里的 findAndCount 之前，如果涉及标签过滤，我们可能需要切换到 QueryBuilder 以获得更好的控制
    let items: Transaction[]
    let total: number

    if (filters?.tagIds && filters.tagIds.length > 0) {
      const queryBuilder = this.transactionRepository.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.tags', 'tag')
        .where('transaction.userId = :userId', { userId })

      if (filters.startDate || filters.endDate) {
        queryBuilder.andWhere('transaction.transactionTime BETWEEN :start AND :end', {
          start: filters.startDate || new Date(0),
          end: filters.endDate || new Date(),
        })
      }

      if (filters.type) {
        queryBuilder.andWhere('transaction.transactionType = :type', { type: filters.type })
      }

      if (filters.counterparty) {
        queryBuilder.andWhere('transaction.counterparty ILIKE :counterparty', { counterparty: `%${filters.counterparty}%` })
      }

      if (filters.minAmount !== undefined) {
        queryBuilder.andWhere('transaction.amount >= :minAmount', { minAmount: filters.minAmount })
      }

      if (filters.maxAmount !== undefined) {
        queryBuilder.andWhere('transaction.amount <= :maxAmount', { maxAmount: filters.maxAmount })
      }

      // 标签过滤：只要包含传入标签中的任意一个即可
      queryBuilder.andWhere((qb) => {
        const subQuery = qb.subQuery()
          .select('tt.transactionId')
          .from('transaction_tags', 'tt')
          .where('tt.tagId IN (:...tagIds)', { tagIds: filters.tagIds })
          .getQuery()
        return `transaction.id IN ${subQuery}`
      })

      const [pagedItems, count] = await Promise.all([
        queryBuilder
          .orderBy('transaction.transactionTime', 'DESC')
          .skip(skip)
          .take(limit)
          .getMany(),
        queryBuilder.getCount(),
      ])
      items = pagedItems
      total = count
    }
    else {
      const [pagedItems, count] = await this.transactionRepository.findAndCount({
        where,
        order,
        take: limit,
        skip,
        relations: ['tags'],
      })
      items = pagedItems
      total = count
    }

    // 计算总收入和总支出 (针对所有过滤后的记录，而不仅仅是当前页)
    const totals = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(CASE WHEN transaction.transactionType = :income THEN transaction.amount ELSE 0 END)', 'totalIncome')
      .addSelect('SUM(CASE WHEN transaction.transactionType = :expense THEN transaction.amount ELSE 0 END)', 'totalExpense')
      .where(where)
      .setParameters({ income: 'income', expense: 'expense' })
      .getRawOne()

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

    transaction.tags = tagsToApply

    const savedTransaction = await this.transactionRepository.save(transaction)

    // 如果应用到所有同商户记录，则查找该用户下所有 counterparty 相同的记录
    if (applyToAllSameCounterparty && transaction.counterparty) {
      const relatedTransactions = await this.transactionRepository.find({
        where: { userId, counterparty: transaction.counterparty },
        relations: ['tags'],
      })

      const updates = relatedTransactions
        .filter(t => t.id !== transaction.id)
        .map((t) => {
          t.tags = tagsToApply
          return t
        })

      if (updates.length > 0) {
        await this.transactionRepository.save(updates)
      }
    }

    return savedTransaction
  }
}
