import type { StatisticsData } from '@account-book/types'
import { Card, Segmented } from 'antd-mobile'
import { useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
  data: StatisticsData['trend']
}

export const TrendChart = ({ data }: Props) => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('bar')

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      notation: 'compact',
    }).format(amount)
  }

  const formatFullAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    }).format(amount)
  }

  const formatDisplayDate = (dateStr: string) => {
    if (dateStr.includes('-') && dateStr.split('-').length === 2) {
      return `${dateStr.split('-')[1]}月`
    }
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const CommonComponents = [
    <defs key="defs">
      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
      </linearGradient>
    </defs>,
    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />,
    <XAxis
      key="xAxis"
      dataKey="date"
      tickFormatter={formatDisplayDate}
      tick={{ fontSize: 10, fill: '#94a3b8' }}
      axisLine={false}
      tickLine={false}
    />,
    <YAxis
      key="yAxis"
      tickFormatter={formatAmount}
      tick={{ fontSize: 10, fill: '#94a3b8' }}
      axisLine={false}
      tickLine={false}
    />,
    <Tooltip
      key="tooltip"
      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      labelStyle={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}
      formatter={(value: any, name: any) => [
        <span key="val" className="font-bold text-slate-800">{formatFullAmount(Number(value))}</span>,
        name === 'income' ? '收入' : '支出'
      ]}
    />
  ]

  return (
    <Card
      title={
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-slate-800 font-bold">收支趋势</span>
          </div>
          <div className="w-full">
            <Segmented
              options={[
                { label: '柱状', value: 'bar' },
                { label: '面积', value: 'area' },
              ]}
              block
              value={chartType}
              onChange={v => setChartType(v as any)}
            />
          </div>
        </div>
      }
      className="rounded-2xl border-none shadow-sm mb-6"
    >
      <div className="h-[260px] w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                {CommonComponents}
                <Area type="monotone" dataKey="expense" name="expense" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
                <Area type="monotone" dataKey="income" name="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={0}>
                {CommonComponents}
                <Bar dataKey="expense" name="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={20} />
                <Bar dataKey="income" name="income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={20} />
              </BarChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            暂无趋势数据
          </div>
        )}
      </div>
    </Card>
  )
}
