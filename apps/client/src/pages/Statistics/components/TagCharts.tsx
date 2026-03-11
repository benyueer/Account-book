import type { StatisticsData } from '@account-book/types'
import { Card, Segmented } from 'antd-mobile'
import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

interface Props {
  data: StatisticsData['tags']
}

// 更加高级的调色板 (HSL 基础)
const COLORS = [
  '#5B8FF9', // Soft Blue
  '#5AD8A6', // Soft Green
  '#5D7092', // Slate
  '#F6BD16', // Soft Yellow
  '#E8684A', // Soft Red
  '#6DC8EC', // Soft Cyan
  '#9270CA', // Soft Purple
  '#FF9D4D', // Soft Orange
]

export const TagCharts = ({ data }: Props) => {
  const [type, setType] = useState<'expense' | 'income'>('expense')

  const filteredData = data
    .filter(item => item.type === type)
    .sort((a, b) => b.amount - a.amount)

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    }).format(amount)
  }

  return (
    <Card title="标签分布" className="rounded-2xl border-none shadow-sm mb-6">
      <div className="mb-4">
        <Segmented
          options={[
            { label: '支出', value: 'expense' },
            { label: '收入', value: 'income' },
          ]}
          value={type}
          onChange={v => setType(v as any)}
        />
      </div>

      <div className="h-[240px] w-full relative">
        {filteredData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="amount"
                  stroke="none"
                  label={({ name, payload }) => `${name?.slice(0, 4)} ${payload?.percentage?.toFixed(0)}%`}
                  labelLine={false}
                >
                  {filteredData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: any, _name: any, props: any) => {
                    const item = props?.payload
                    return [
                      <span key="amount" className="font-bold text-slate-800">{formatAmount(Number(value))}</span>,
                      <span key="tag" className="text-slate-500 text-xs">标签: {item?.name}</span>
                    ]
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400">标签{type === 'expense' ? '支出' : '收入'}</span>
                <span className="text-lg font-bold text-slate-800">
                    {formatAmount(filteredData.reduce((acc, cur) => acc + cur.amount, 0))}
                </span>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            暂无相关标签统计
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {filteredData.slice(0, 5).map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-slate-600 font-medium">{item.name}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-400">{item.percentage.toFixed(1)}%</span>
              <span className="text-slate-800 font-semibold">{formatAmount(item.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
