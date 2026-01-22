import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository, FindManyOptions, FindOptionsOrder, Between, QueryFailedError } from 'typeorm'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Transaction } from './entities/transaction.entity'
import { PaginationDto } from '../../common/dto/pagination.dto'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    try {
      const transaction = this.transactionRepository.create({
        ...createTransactionDto,
        userId,
      })
      return await this.transactionRepository.save(transaction)
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError?.code === '23505') {
        const detail = error.driverError.detail || '唯一键冲突'
        if (detail.includes('transactionOrderNumber')) {
          throw new Error(`交易订单号已存在: ${createTransactionDto.transactionOrderNumber}`)
        } else if (detail.includes('merchantOrderNumber')) {
          throw new Error(`商家订单号已存在: ${createTransactionDto.merchantOrderNumber}`)
        }
      }
      throw error
    }
  }

  async findAll(
    userId: string,
    pagination: PaginationDto,
    filters?: { startDate?: Date; endDate?: Date },
  ) {
    const { page = 1, limit = 10 } = pagination
    const skip = (page - 1) * limit
    
    const where: FindOptionsWhere<Transaction> = { userId }
    
    // 添加日期范围过滤
    if (filters?.startDate || filters?.endDate) {
      where.transactionTime = Between(
        filters.startDate || new Date(0), // 如果没有开始日期，则从最早时间开始
        filters.endDate || new Date(),    // 如果没有结束日期，则到现在
      )
    }

    const order: FindOptionsOrder<Transaction> = { transactionTime: 'DESC' }
    
    const [items, total] = await this.transactionRepository.findAndCount({
      where,
      order,
      take: limit,
      skip,
    })

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOneById(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id, userId } as FindOptionsWhere<Transaction>,
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
    const result = await this.transactionRepository.delete({ id, userId } as any)
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`)
    }
  }
}
