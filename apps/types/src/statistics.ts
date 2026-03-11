export interface StatisticsOverview {
  totalIncome: number
  totalExpense: number
  balance: number
  dailyAverageExpense: number
}

export interface CategoryDistribution {
  name: string
  amount: number
  percentage: number
  type: 'income' | 'expense'
}

export interface TrendData {
  date: string
  income: number
  expense: number
}

export type TimeRange = 'year' | 'month' | 'day'

export interface TagDistribution {
  name: string
  amount: number
  percentage: number
  type: 'income' | 'expense'
}

export interface MerchantDistribution {
  name: string
  amount: number
  percentage: number
  type: 'income' | 'expense'
}

export interface StatisticsData {
  overview: StatisticsOverview
  categories: CategoryDistribution[]
  tags: TagDistribution[]
  merchants: MerchantDistribution[]
  trend: TrendData[]
}
