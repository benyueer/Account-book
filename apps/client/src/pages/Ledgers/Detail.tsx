import { useQuery } from '@tanstack/react-query'
import { DatePicker, PullToRefresh, Segmented } from 'antd-mobile'
import dayjs from 'dayjs'
import type { TimeRange } from '@account-book/types'
import { motion } from 'framer-motion'
import { Calendar, List as ListIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { statisticsApi } from '../../api/statistics'
import { ledgerApi } from '../../api/ledger'
import { CategoryCharts } from '../Statistics/components/CategoryCharts'
import { MerchantCharts } from '../Statistics/components/MerchantCharts'
import { StatisticsSummary } from '../Statistics/components/StatisticsSummary'
import { TagCharts } from '../Statistics/components/TagCharts'
import { TrendChart } from '../Statistics/components/TrendChart'

// 移除本地 TimeType，统一使用 @account-book/types 中的 TimeRange

export default function LedgerDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(dayjs().toISOString())
  const [timeType, setTimeType] = useState<TimeRange>('all')
  const [pickerVisible, setPickerVisible] = useState(false)

  const { data: ledger } = useQuery({
    queryKey: ['ledger', id],
    queryFn: () => ledgerApi.findOne(id!),
    enabled: !!id,
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ledger-statistics', id, currentDate, timeType],
    queryFn: () => statisticsApi.getStatistics({ date: currentDate, type: timeType, ledgerId: id }),
    enabled: !!id,
  })

  const onDateConfirm = (date: Date) => {
    setCurrentDate(date.toISOString())
  }

  const formatDisplayDate = () => {
    if (timeType === 'all') return '全部时间'
    const d = dayjs(currentDate)
    if (timeType === 'year') return d.format('YYYY年')
    if (timeType === 'month') return d.format('YYYY年MM月')
    return d.format('YYYY年MM月DD日')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-screen overflow-y-auto p-4 bg-slate-50/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          onClick={() => navigate(-1)}
          className="p-1.5 bg-white rounded-full shadow-sm text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} />
        </div>
        <h1 className="text-xl text-slate-800 font-bold flex-1 truncate">{ledger?.name || '账本详情'}</h1>
        <div
          onClick={() => timeType !== 'all' && setPickerVisible(true)}
          className={`flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm text-sm font-medium active:scale-95 transition-transform ${timeType === 'all' ? 'text-slate-300' : 'text-slate-600'}`}
        >
          <Calendar size={16} className={timeType === 'all' ? 'text-slate-300' : 'text-indigo-500'} />
          <span>{formatDisplayDate()}</span>
        </div>
      </div>

      <div className="mb-6">
        <Segmented
          options={[
            { label: '全部', value: 'all' },
            { label: '年', value: 'year' },
            { label: '月', value: 'month' },
            { label: '日', value: 'day' },
          ]}
          value={timeType}
          onChange={v => setTimeType(v as TimeRange)}
          block
        />
      </div>

      <PullToRefresh onRefresh={async () => { await refetch() }}>
        {data && (
          <>
            <StatisticsSummary data={data.overview} loading={isLoading} timeType={timeType} />
            
            {/* 跳转记录列表的大按钮 */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/ledgers/${id}/transactions`)}
              className="mb-6 bg-gradient-to-r from-indigo-500 to-blue-600 p-4 rounded-2xl shadow-lg flex items-center justify-between text-white cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ListIcon size={24} />
                </div>
                <div>
                  <div className="font-bold">查询明细</div>
                  <div className="text-xs text-white/70">查看该账本下的所有交易</div>
                </div>
              </div>
              <ChevronRight size={24} className="opacity-50" />
            </motion.div>

            {timeType !== 'day' && <TrendChart data={data.trend} />}
            <CategoryCharts data={data.categories} />
            <TagCharts data={data.tags} />
            <MerchantCharts data={data.merchants} />
            {/* 底部占位 */}
            <div className="h-32" />
          </>
        )}

        {isLoading && !data && (
          <div className="flex flex-col gap-6">
             <div className="h-24 bg-white rounded-2xl animate-pulse" />
             <div className="h-16 bg-white rounded-2xl animate-pulse" />
             <div className="h-64 bg-white rounded-2xl animate-pulse" />
          </div>
        )}
      </PullToRefresh>

      <DatePicker
        title="选择时间"
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        precision={timeType === 'all' ? 'month' : timeType}
        value={dayjs(currentDate).toDate()}
        onConfirm={onDateConfirm}
      />
    </motion.div>
  )
}
