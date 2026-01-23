import { DatePicker, Popup } from 'antd-mobile'
import { useState } from 'react'

interface FilterBarProps {
  year?: number
  month?: number
  type?: string
  onFilterChange: (year: number, month: number) => void
  onTypeChange: (type?: string) => void
  onReset: () => void
  totalIncome: number
  totalExpense: number
}

export function FilterBar({
  year,
  month,
  type,
  onFilterChange,
  onTypeChange,
  onReset,
  totalIncome,
  totalExpense,
}: FilterBarProps) {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="flex flex-col gap-2 px-4 py-2">
          {/* Header row: Totals and Reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-400 font-medium uppercase">
                  支出
                </span>
                <span className="text-lg text-slate-900 font-bold leading-none">
                  ¥
                  {Math.abs(totalExpense).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="h-3 w-[1px] bg-gray-200" />
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-400 font-medium uppercase">
                  收入
                </span>
                <span className="text-sm text-slate-600 font-semibold leading-none">
                  ¥
                  {totalIncome.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <button
              className="hover:text-primary rounded bg-slate-50 px-2 py-1 text-[10px] text-slate-400 font-medium transition-colors"
              onClick={onReset}
            >
              清除
            </button>
          </div>

          {/* Filter row: Date and Type selectors */}
          <div className="flex gap-2 pb-1">
            <button
              className="group flex flex-1 items-center justify-between gap-1 rounded-lg bg-slate-100/50 px-3 py-1.5 transition-colors hover:bg-slate-100"
              onClick={() => setPickerVisible(true)}
            >
              <div className="flex items-center gap-1.5">
                <div className="i-mdi-calendar-month-outline text-sm text-slate-400" />
                <span className="text-xs text-slate-700 font-semibold">
                  {year !== undefined && month !== undefined
                    ? `${year}年${month + 1}月`
                    : '全部时间'}
                </span>
              </div>
              <div className="i-mdi-chevron-down text-slate-300 transition-colors group-hover:text-slate-500" />
            </button>

            <button
              className="group flex flex-1 items-center justify-between gap-1 rounded-lg bg-slate-100/50 px-3 py-1.5 transition-colors hover:bg-slate-100"
              onClick={() => setTypeVisible(true)}
            >
              <div className="flex items-center gap-1.5">
                <div className="i-mdi-filter-variant text-sm text-slate-400" />
                <span className="text-xs text-slate-700 font-semibold">
                  {type === 'income'
                    ? '只看收入'
                    : type === 'expense'
                      ? '只看支出'
                      : '全部类型'}
                </span>
              </div>
              <div className="i-mdi-chevron-down text-slate-300 transition-colors group-hover:text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      <DatePicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        precision="month"
        onConfirm={(val) => {
          onFilterChange(val.getFullYear(), val.getMonth())
        }}
        value={
          year !== undefined && month !== undefined
            ? new Date(year, month)
            : new Date()
        }
      />

      <Popup
        visible={typeVisible}
        onMaskClick={() => setTypeVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        <div className="flex flex-col bg-slate-50">
          <div className="border-b border-gray-100 p-4 text-center text-slate-800 font-bold">
            选择交易类型
          </div>
          <div className="flex flex-col gap-3 p-6">
            <button
              className={`rounded-xl p-4 text-center transition-all ${!type ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'bg-white text-slate-600 border border-slate-100'}`}
              onClick={() => {
                onTypeChange(undefined)
                setTypeVisible(false)
              }}
            >
              <span className="text-sm font-semibold">全部类型</span>
            </button>
            <button
              className={`rounded-xl p-4 text-center transition-all ${type === 'expense' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'bg-white text-slate-600 border border-slate-100'}`}
              onClick={() => {
                onTypeChange('expense')
                setTypeVisible(false)
              }}
            >
              <span className="text-sm font-semibold">只看支出</span>
            </button>
            <button
              className={`rounded-xl p-4 text-center transition-all ${type === 'income' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'bg-white text-slate-600 border border-slate-100'}`}
              onClick={() => {
                onTypeChange('income')
                setTypeVisible(false)
              }}
            >
              <span className="text-sm font-semibold">只看收入</span>
            </button>
            <button
              className="mt-2 rounded-xl p-4 text-center text-sm text-slate-400 font-medium"
              onClick={() => setTypeVisible(false)}
            >
              取消
            </button>
          </div>
        </div>
      </Popup>
    </>
  )
}
