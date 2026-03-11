import type { StatisticsData, TimeRange } from '@account-book/types'
import apiClient from './axios'

export const statisticsApi = {
  getStatistics: async (params: { date: string, type: TimeRange, ledgerId?: string }) => {
    const res = await apiClient.get<StatisticsData>('/v1/statistics', { params })
    return res.data
  },
}
