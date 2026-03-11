import { useQuery } from '@tanstack/react-query'
import { DatePicker, PullToRefresh, Segmented } from 'antd-mobile'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useState } from 'react'
import { statisticsApi } from '../../api/statistics'
import { CategoryCharts } from './components/CategoryCharts'
import { MerchantCharts } from './components/MerchantCharts'
import { StatisticsSummary } from './components/StatisticsSummary'
import { TagCharts } from './components/TagCharts'
import { TrendChart } from './components/TrendChart'

type TimeType = 'year' | 'month' | 'day'

export default function Statistics() {
  const [currentDate, setCurrentDate] = useState(dayjs().toISOString())
  const [timeType, setTimeType] = useState<TimeType>('month')
  const [pickerVisible, setPickerVisible] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['statistics', currentDate, timeType],
    queryFn: () => statisticsApi.getStatistics({ date: currentDate, type: timeType }),
  })

  const onDateConfirm = (date: Date) => {
    setCurrentDate(date.toISOString())
  }

  const formatDisplayDate = () => {
    const d = dayjs(currentDate)
    if (timeType === 'year') return d.format('YYYY年')
    if (timeType === 'month') return d.format('YYYY年MM月')
    return d.format('YYYY年MM月DD日')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="h-screen overflow-y-auto p-4 bg-slate-50/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl text-slate-800 font-bold">统计看板</h1>
        <div
          onClick={() => setPickerVisible(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm text-sm font-medium text-slate-600 active:scale-95 transition-transform"
        >
          <Calendar size={16} className="text-indigo-500" />
          <span>{formatDisplayDate()}</span>
        </div>
      </div>

      <div className="mb-6">
        <Segmented
          options={[
            { label: '年', value: 'year' },
            { label: '月', value: 'month' },
            { label: '日', value: 'day' },
          ]}
          value={timeType}
          onChange={v => setTimeType(v as TimeType)}
          block
        />
      </div>

      <PullToRefresh onRefresh={async () => { await refetch() }}>
        {data && (
          <>
            <StatisticsSummary data={data.overview} loading={isLoading} timeType={timeType} />
            {timeType !== 'day' && <TrendChart data={data.trend} />}
            <CategoryCharts data={data.categories} />
            <TagCharts data={data.tags} />
            <MerchantCharts data={data.merchants} />
            {/* 底部占位：防止被 TabBar 遮挡 */}
            <div className="h-32" />
          </>
        )}

        {isLoading && !data && (
          <div className="flex flex-col gap-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white rounded-2xl animate-pulse" />
                <div className="h-24 bg-white rounded-2xl animate-pulse" />
                <div className="h-24 bg-white rounded-2xl animate-pulse" />
                <div className="h-24 bg-white rounded-2xl animate-pulse" />
             </div>
             <div className="h-64 bg-white rounded-2xl animate-pulse" />
             <div className="h-64 bg-white rounded-2xl animate-pulse" />
          </div>
        )}
      </PullToRefresh>

      <DatePicker
        title="选择时间"
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        precision={timeType}
        value={dayjs(currentDate).toDate()}
        onConfirm={onDateConfirm}
      />
    </motion.div>
  )
}
