import type { StatisticsData } from '@account-book/types'
import { Card } from 'antd-mobile'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Calculator, Wallet } from 'lucide-react'

interface Props {
  data: StatisticsData['overview']
  loading?: boolean
  timeType: 'year' | 'month' | 'day'
}

export const StatisticsSummary = ({ data, loading, timeType }: Props) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    }).format(amount)
  }

  const typeLabel = timeType === 'year' ? '本年' : timeType === 'month' ? '本月' : '本日'

  const items = [
    {
      title: `${typeLabel}支出`,
      value: data.totalExpense,
      icon: <ArrowDownRight className="text-red-500" size={20} />,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: `${typeLabel}收入`,
      value: data.totalIncome,
      icon: <ArrowUpRight className="text-emerald-500" size={20} />,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      title: '结余',
      value: data.balance,
      icon: <Wallet className="text-blue-500" size={20} />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: timeType === 'year' ? '年日均支出' : '月日均支出',
      value: data.dailyAverageExpense,
      icon: <Calculator className="text-amber-500" size={20} />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      hidden: timeType === 'day',
    },
  ].filter(item => !item.hidden)

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="rounded-2xl border-none shadow-sm h-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm font-medium">{item.title}</span>
                <div className={`${item.bgColor} p-1.5 rounded-lg`}>
                  {item.icon}
                </div>
              </div>
              <div className={`text-lg font-bold ${item.color}`}>
                {loading ? '---' : formatAmount(item.value)}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
