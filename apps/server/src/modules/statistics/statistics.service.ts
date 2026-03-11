import { CategoryDistribution, MerchantDistribution, StatisticsData, StatisticsOverview, TagDistribution, TrendData } from '@account-book/types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'
import { Transaction } from '../transactions/entities/transaction.entity'

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getStatistics(userId: string, date: string, type: 'year' | 'month' | 'day' | 'all' = 'month', ledgerId?: string): Promise<StatisticsData> {
    const start = type === 'all' ? dayjs('2000-01-01').toDate() : dayjs(date).startOf(type).toDate()
    const end = type === 'all' ? dayjs().endOf('day').toDate() : dayjs(date).endOf(type).toDate()

    const [overview, categories, tags, merchants, trend] = await Promise.all([
      this.getOverview(userId, start, end, type, ledgerId),
      this.getCategories(userId, start, end, ledgerId),
      this.getTagsDistribution(userId, start, end, ledgerId),
      this.getMerchantsDistribution(userId, start, end, ledgerId),
      this.getTrend(userId, start, end, type, ledgerId),
    ])

    return { overview, categories, tags, merchants, trend }
  }

  private async getOverview(userId: string, start: Date, end: Date, type: 'year' | 'month' | 'day' | 'all', ledgerId?: string): Promise<StatisticsOverview> {
    const qb = this.transactionRepository
      .createQueryBuilder('t')
      .select('SUM(CASE WHEN t.transactionType = :income THEN t.amount ELSE 0 END)', 'totalIncome')
      .addSelect('SUM(CASE WHEN t.transactionType = :expense THEN t.amount ELSE 0 END)', 'totalExpense')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })

    if (ledgerId) {
      qb.innerJoin('ledger_transactions', 'lt', 'lt.transactionId = t.id AND lt.ledgerId = :ledgerId', { ledgerId })
    }

    const result = await qb
      .setParameters({ income: 'income', expense: 'expense' })
      .getRawOne()

    const totalIncome = Number(result.totalIncome || 0)
    const totalExpense = Number(result.totalExpense || 0)
    const balance = totalIncome - totalExpense

    let days = 1
    if (type === 'year') {
      days = dayjs(start).isAfter(dayjs().startOf('year')) ? dayjs().diff(dayjs(start), 'day') + 1 : 365
    }
    else if (type === 'month') {
      days = dayjs(start).isSame(dayjs(), 'month') ? dayjs().date() : dayjs(start).daysInMonth()
    }
    else if (type === 'all') {
      const firstTransaction = await this.transactionRepository.findOne({
        where: { userId },
        order: { transactionTime: 'ASC' },
      })
      days = firstTransaction ? dayjs().diff(dayjs(firstTransaction.transactionTime), 'day') + 1 : 1
    }

    const dailyAverageExpense = totalExpense / days

    return {
      totalIncome,
      totalExpense,
      balance,
      dailyAverageExpense,
    }
  }

  private async getCategories(userId: string, start: Date, end: Date, ledgerId?: string): Promise<CategoryDistribution[]> {
    const qb = this.transactionRepository
      .createQueryBuilder('t')
      .select('t.transactionCategory', 'name')
      .addSelect('t.transactionType', 'type')
      .addSelect('SUM(t.amount)', 'amount')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })

    if (ledgerId) {
      qb.innerJoin('ledger_transactions', 'lt', 'lt.transactionId = t.id AND lt.ledgerId = :ledgerId', { ledgerId })
    }

    const results = await qb
      .groupBy('t.transactionCategory')
      .addGroupBy('t.transactionType')
      .getRawMany()

    const totalByStatus = results.reduce((acc, cur) => {
      acc[cur.type] = (acc[cur.type] || 0) + Number(cur.amount)
      return acc
    }, {} as Record<string, number>)

    return results.map(r => ({
      name: r.name || '其他',
      type: r.type,
      amount: Number(r.amount),
      percentage: totalByStatus[r.type] ? (Number(r.amount) / totalByStatus[r.type]) * 100 : 0,
    }))
  }

  private async getTagsDistribution(userId: string, start: Date, end: Date, ledgerId?: string): Promise<TagDistribution[]> {
    const qb = this.transactionRepository
      .createQueryBuilder('t')
      .leftJoin('t.tags', 'tag')
      .select('tag.name', 'name')
      .addSelect('t.transactionType', 'type')
      .addSelect('SUM(t.amount)', 'amount')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })
      .andWhere('tag.name IS NOT NULL')

    if (ledgerId) {
      qb.innerJoin('ledger_transactions', 'lt', 'lt.transactionId = t.id AND lt.ledgerId = :ledgerId', { ledgerId })
    }

    const results = await qb
      .groupBy('tag.name')
      .addGroupBy('t.transactionType')
      .getRawMany()

    const totalByStatus = results.reduce((acc, cur) => {
      acc[cur.type] = (acc[cur.type] || 0) + Number(cur.amount)
      return acc
    }, {} as Record<string, number>)

    return results.map(r => ({
      name: r.name,
      type: r.type,
      amount: Number(r.amount),
      percentage: totalByStatus[r.type] ? (Number(r.amount) / totalByStatus[r.type]) * 100 : 0,
    }))
  }

  private async getMerchantsDistribution(userId: string, start: Date, end: Date, ledgerId?: string): Promise<MerchantDistribution[]> {
    const qb = this.transactionRepository
      .createQueryBuilder('t')
      .select('t.counterparty', 'name')
      .addSelect('t.transactionType', 'type')
      .addSelect('SUM(t.amount)', 'amount')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })
      .andWhere('t.counterparty IS NOT NULL AND t.counterparty != \'\'')

    if (ledgerId) {
      qb.innerJoin('ledger_transactions', 'lt', 'lt.transactionId = t.id AND lt.ledgerId = :ledgerId', { ledgerId })
    }

    const results = await qb
      .groupBy('t.counterparty')
      .addGroupBy('t.transactionType')
      .getRawMany()

    const totalByStatus = results.reduce((acc, cur) => {
      acc[cur.type] = (acc[cur.type] || 0) + Number(cur.amount)
      return acc
    }, {} as Record<string, number>)

    return results.map(r => ({
      name: r.name,
      type: r.type,
      amount: Number(r.amount),
      percentage: totalByStatus[r.type] ? (Number(r.amount) / totalByStatus[r.type]) * 100 : 0,
    }))
  }

  private async getTrend(userId: string, start: Date, end: Date, type: 'year' | 'month' | 'day' | 'all', ledgerId?: string): Promise<TrendData[]> {
    const format = (type === 'year' || type === 'all') ? 'YYYY-MM' : 'YYYY-MM-DD'
    const qb = this.transactionRepository
      .createQueryBuilder('t')
      .select(`TO_CHAR(t.transactionTime, '${format}')`, 'date')
      .addSelect('SUM(CASE WHEN t.transactionType = :income THEN t.amount ELSE 0 END)', 'income')
      .addSelect('SUM(CASE WHEN t.transactionType = :expense THEN t.amount ELSE 0 END)', 'expense')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })

    if (ledgerId) {
      qb.innerJoin('ledger_transactions', 'lt', 'lt.transactionId = t.id AND lt.ledgerId = :ledgerId', { ledgerId })
    }

    const results = await qb
      .setParameters({ income: 'income', expense: 'expense' })
      .groupBy(`TO_CHAR(t.transactionTime, '${format}')`)
      .orderBy('date', 'ASC')
      .getRawMany()

    return results.map(r => ({
      date: r.date,
      income: Number(r.income),
      expense: Number(r.expense),
    }))
  }
}
