import { Button, Calendar, CheckList, Input, Popup } from 'antd-mobile'
import { useState } from 'react'
import { useTags } from '../../hooks/api/useTags'

interface FilterBarProps {
  startDate?: Date
  endDate?: Date
  type?: string
  counterparty?: string
  tagIds?: string[]
  minAmount?: number
  maxAmount?: number
  onDateRangeChange: (startDate?: Date, endDate?: Date) => void
  onTypeChange: (type?: string) => void
  onCounterpartyChange: (counterparty?: string) => void
  onTagsChange: (tagIds: string[]) => void
  onAmountRangeChange: (min?: number, max?: number) => void
  onReset: () => void
  totalIncome: number
  totalExpense: number
  selectionMode?: boolean
  onSelectionModeToggle?: () => void
}

export function FilterBar({
  startDate,
  endDate,
  type,
  counterparty,
  tagIds,
  minAmount,
  maxAmount,
  onDateRangeChange,
  onTypeChange,
  onCounterpartyChange,
  onTagsChange,
  onAmountRangeChange,
  onReset,
  totalIncome,
  totalExpense,
  selectionMode,
  onSelectionModeToggle,
}: FilterBarProps) {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [moreVisible, setMoreVisible] = useState(false)
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [tempRange, setTempRange] = useState<[Date, Date] | null>(null)

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

          {/* Filter row: Date, Type and More selectors */}
          <div className="flex gap-2 pb-1">
            <button
              className="group flex flex-1 items-center justify-between gap-1 rounded-lg bg-slate-100/50 px-3 py-1.5 transition-colors hover:bg-slate-100"
              onClick={() => setPickerVisible(true)}
            >
              <div className="flex items-center gap-1.5">
                <div className="i-mdi-calendar-month-outline text-sm text-slate-400" />
                <span className="text-xs text-slate-700 font-semibold truncate max-w-[80px]">
                  {(() => {
                    if (!startDate && !endDate) return '全部时间'
                    if (startDate && endDate) {
                      const start = `${startDate.getMonth() + 1}/${startDate.getDate()}`
                      const end = `${endDate.getMonth() + 1}/${endDate.getDate()}`
                      if (start === end) return start
                      return `${start}-${end}`
                    }
                    return '选择时间'
                  })()}
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
                    ? '收入'
                    : type === 'expense'
                      ? '支出'
                      : '类型'}
                </span>
              </div>
              <div className="i-mdi-chevron-down text-slate-300 transition-colors group-hover:text-slate-500" />
            </button>

            <button
              className={`group flex items-center gap-1 rounded-lg px-3 py-1.5 transition-colors ${moreVisible || counterparty || (tagIds && tagIds.length > 0) || minAmount !== undefined || maxAmount !== undefined ? 'bg-primary/10 text-primary' : 'bg-slate-100/50 text-slate-700 hover:bg-slate-100'}`}
              onClick={() => setMoreVisible(true)}
            >
              <div className={`i-mdi-tune-variant text-sm ${moreVisible || counterparty || (tagIds && tagIds.length > 0) || minAmount !== undefined || maxAmount !== undefined ? 'text-primary' : 'text-slate-400'}`} />
              <span className="text-xs font-semibold">筛选</span>
              {((tagIds && tagIds.length > 0) || counterparty || minAmount !== undefined || maxAmount !== undefined) && (
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>

            <button
              className={`group flex items-center justify-center rounded-lg p-1.5 transition-colors ${selectionMode ? 'bg-indigo-500 text-white shadow-sm' : 'bg-slate-100/50 text-slate-400 hover:bg-slate-100'}`}
              onClick={onSelectionModeToggle}
              title={selectionMode ? '取消选择' : '批量操作'}
            >
              <div className={`text-lg ${selectionMode ? 'i-mdi-check-all' : 'i-mdi-checkbox-multiple-marked-outline'}`} />
            </button>
          </div>
        </div>
      </div>

      <Popup
        visible={pickerVisible}
        onMaskClick={() => setPickerVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        <div className="flex flex-col bg-slate-50 pb-12">
          <div className="border-b border-gray-100 p-4 text-center text-slate-800 font-bold">
            选择时间范围
          </div>
          <div className="grid grid-cols-3 gap-3 p-4">
            {[
              { label: '今天', getValue: () => {
                const start = new Date()
                start.setHours(0, 0, 0, 0)
                const end = new Date()
                end.setHours(23, 59, 59, 999)
                return [start, end]
              } },
              { label: '昨天', getValue: () => {
                const start = new Date()
                start.setDate(start.getDate() - 1)
                start.setHours(0, 0, 0, 0)
                const end = new Date(start)
                end.setHours(23, 59, 59, 999)
                return [start, end]
              } },
              { label: '本周', getValue: () => {
                const now = new Date()
                const start = new Date(now)
                start.setDate(now.getDate() - now.getDay())
                start.setHours(0, 0, 0, 0)
                const end = new Date(now)
                end.setHours(23, 59, 59, 999)
                return [start, end]
              } },
              { label: '上周', getValue: () => {
                const now = new Date()
                const start = new Date(now)
                start.setDate(now.getDate() - now.getDay() - 7)
                start.setHours(0, 0, 0, 0)
                const end = new Date(start)
                end.setDate(start.getDate() + 6)
                end.setHours(23, 59, 59, 999)
                return [start, end]
              } },
              { label: '本月', getValue: () => {
                const now = new Date()
                const start = new Date(now.getFullYear(), now.getMonth(), 1)
                const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                return [start, end]
              } },
              { label: '上月', getValue: () => {
                const now = new Date()
                const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
                return [start, end]
              } },
              { label: '本季度', getValue: () => {
                const now = new Date()
                const quarter = Math.floor(now.getMonth() / 3)
                const start = new Date(now.getFullYear(), quarter * 3, 1)
                const end = new Date(now.getFullYear(), (quarter + 1) * 3, 0, 23, 59, 59, 999)
                return [start, end]
              } },
              { label: '今年', getValue: () => {
                const now = new Date()
                const start = new Date(now.getFullYear(), 0, 1)
                const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
                return [start, end]
              } },
              { label: '全部', getValue: () => [undefined, undefined] },
            ].map((item) => (
              <button
                key={item.label}
                className="rounded-lg bg-white border border-slate-100 py-2.5 text-xs font-medium text-slate-600 active:bg-slate-50 transition-colors shadow-sm"
                onClick={() => {
                  const [start, end] = item.getValue()
                  onDateRangeChange(start, end)
                  setPickerVisible(false)
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              className="col-span-3 mt-2 rounded-lg bg-primary/5 border border-primary/10 py-3 text-xs font-bold text-primary active:bg-primary/10 transition-colors"
              onClick={() => {
                setCalendarVisible(true)
              }}
            >
              自定义时间范围
            </button>
          </div>
        </div>
      </Popup>

      <Popup
        visible={calendarVisible}
        onMaskClick={() => setCalendarVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        <div className="flex flex-col bg-white pb-8">
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <button
              className="text-sm text-slate-400"
              onClick={() => setCalendarVisible(false)}
            >
              取消
            </button>
            <span className="text-slate-800 font-bold">选择日期范围</span>
            <div className="w-8" /> {/* Spacer */}
          </div>
          <Calendar
            selectionMode="range"
            value={tempRange ? [tempRange[0], tempRange[1]] : (startDate && endDate ? [startDate, endDate] : null)}
            onChange={(val) => {
              if (val && val.length === 2) {
                setTempRange([val[0], val[1]])
              } else {
                setTempRange(null)
              }
            }}
          />
          <div className="px-4 mt-4">
            <Button
              block
              color="primary"
              disabled={!tempRange}
              onClick={() => {
                if (tempRange) {
                  const [start, end] = tempRange
                  // 设置开始时间为当天 00:00:00
                  const startDateObj = new Date(start)
                  startDateObj.setHours(0, 0, 0, 0)
                  // 设置结束时间为当天 23:59:59
                  const endDateObj = new Date(end)
                  endDateObj.setHours(23, 59, 59, 999)

                  onDateRangeChange(startDateObj, endDateObj)
                  setCalendarVisible(false)
                  setPickerVisible(false)
                  setTempRange(null)
                }
              }}
              style={{ '--border-radius': '10px' }}
            >
              确认范围
            </Button>
          </div>
        </div>
      </Popup>

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
          <div className="flex flex-col gap-3 p-6 pb-12">
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

      <Popup
        visible={moreVisible}
        onMaskClick={() => setMoreVisible(false)}
        position="right"
        bodyStyle={{ width: '85vw' }}
      >
        <div className="flex h-full flex-col bg-slate-50">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4">
            <span className="text-sm font-bold text-slate-800">高级筛选</span>
            <button
              className="text-xs text-slate-400 font-medium"
              onClick={() => {
                onCounterpartyChange(undefined)
                onTagsChange([])
                onAmountRangeChange(undefined, undefined)
              }}
            >
              重置全部
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-6">
              {/* Counterparty */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500">商户名称</span>
                <div className="rounded-lg bg-white px-3 py-2 border border-slate-100 shadow-sm">
                  <Input
                    placeholder="按商户名称模糊查找..."
                    value={counterparty || ''}
                    onChange={(val) => onCounterpartyChange(val || undefined)}
                    style={{ '--font-size': '14px' }}
                  />
                </div>
              </div>

              {/* Amount Range */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500">金额范围</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-white px-3 py-2 border border-slate-100 shadow-sm">
                    <Input
                      type="number"
                      placeholder="最小金额"
                      value={minAmount?.toString() || ''}
                      onChange={(val) => onAmountRangeChange(val ? Number(val) : undefined, maxAmount)}
                      style={{ '--font-size': '14px' }}
                    />
                  </div>
                  <span className="text-slate-300">-</span>
                  <div className="flex-1 rounded-lg bg-white px-3 py-2 border border-slate-100 shadow-sm">
                    <Input
                      type="number"
                      placeholder="最大金额"
                      value={maxAmount?.toString() || ''}
                      onChange={(val) => onAmountRangeChange(minAmount, val ? Number(val) : undefined)}
                      style={{ '--font-size': '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">标签 (多选)</span>
                  {tagIds && tagIds.length > 0 && (
                    <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      已选 {tagIds.length}
                    </span>
                  )}
                </div>
                <div className="max-h-[350px] overflow-y-auto rounded-xl bg-white border border-slate-100 shadow-sm">
                  <TagSelector
                    selectedTagIds={tagIds || []}
                    onChange={onTagsChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-white p-4">
            <Button
              block
              color="primary"
              onClick={() => setMoreVisible(false)}
              style={{ '--border-radius': '10px' }}
            >
              确认
            </Button>
          </div>
        </div>
      </Popup>
    </>
  )
}

function TagSelector({ selectedTagIds, onChange }: { selectedTagIds: string[], onChange: (ids: string[]) => void }) {
  const { data: tags, isLoading } = useTags()

  if (isLoading) return <div className="p-4 text-center text-xs text-slate-400">加载标签中...</div>
  if (!tags || tags.length === 0) return <div className="p-4 text-center text-xs text-slate-400">暂无标签</div>

  return (
    <CheckList
      multiple
      value={selectedTagIds}
      onChange={(val) => onChange(val as string[])}
      style={{ '--font-size': '14px' }}
    >
      {tags.map((tag) => (
        <CheckList.Item key={tag.id} value={tag.id}>
          <div className="flex items-center gap-2">
            <div
              className="i-mdi-tag-outline text-slate-300"
            />
            <span>{tag.name}</span>
          </div>
        </CheckList.Item>
      ))}
    </CheckList>
  )
}
