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

  async getStatistics(userId: string, date: string, type: 'year' | 'month' | 'day' = 'month'): Promise<StatisticsData> {
    const start = dayjs(date).startOf(type).toDate()
    const end = dayjs(date).endOf(type).toDate()

    const [overview, categories, tags, merchants, trend] = await Promise.all([
      this.getOverview(userId, start, end, type),
      this.getCategories(userId, start, end),
      this.getTagsDistribution(userId, start, end),
      this.getMerchantsDistribution(userId, start, end),
      this.getTrend(userId, start, end, type),
    ])

    return { overview, categories, tags, merchants, trend }
  }

  private async getOverview(userId: string, start: Date, end: Date, type: 'year' | 'month' | 'day'): Promise<StatisticsOverview> {
    const result = await this.transactionRepository
      .createQueryBuilder('t')
      .select('SUM(CASE WHEN t.transactionType = :income THEN t.amount ELSE 0 END)', 'totalIncome')
      .addSelect('SUM(CASE WHEN t.transactionType = :expense THEN t.amount ELSE 0 END)', 'totalExpense')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })
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

    const dailyAverageExpense = totalExpense / days

    return {
      totalIncome,
      totalExpense,
      balance,
      dailyAverageExpense,
    }
  }

  private async getCategories(userId: string, start: Date, end: Date): Promise<CategoryDistribution[]> {
    const results = await this.transactionRepository
      .createQueryBuilder('t')
      .select('t.transactionCategory', 'name')
      .addSelect('t.transactionType', 'type')
      .addSelect('SUM(t.amount)', 'amount')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })
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

  private async getTagsDistribution(userId: string, start: Date, end: Date): Promise<TagDistribution[]> {
    const results = await this.transactionRepository
      .createQueryBuilder('t')
      .leftJoin('t.tags', 'tag')
      .select('tag.name', 'name')
      .addSelect('t.transactionType', 'type')
      .addSelect('SUM(t.amount)', 'amount')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })
      .andWhere('tag.name IS NOT NULL')
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

  private async getMerchantsDistribution(userId: string, start: Date, end: Date): Promise<MerchantDistribution[]> {
    const results = await this.transactionRepository
      .createQueryBuilder('t')
      .select('t.counterparty', 'name')
      .addSelect('t.transactionType', 'type')
      .addSelect('SUM(t.amount)', 'amount')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })
      .andWhere('t.counterparty IS NOT NULL AND t.counterparty != \'\'')
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

  private async getTrend(userId: string, start: Date, end: Date, type: 'year' | 'month' | 'day'): Promise<TrendData[]> {
    const format = type === 'year' ? 'YYYY-MM' : 'YYYY-MM-DD'
    const results = await this.transactionRepository
      .createQueryBuilder('t')
      .select(`TO_CHAR(t.transactionTime, '${format}')`, 'date')
      .addSelect('SUM(CASE WHEN t.transactionType = :income THEN t.amount ELSE 0 END)', 'income')
      .addSelect('SUM(CASE WHEN t.transactionType = :expense THEN t.amount ELSE 0 END)', 'expense')
      .where('t.userId = :userId', { userId })
      .andWhere('t.transactionTime BETWEEN :start AND :end', { start, end })
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
