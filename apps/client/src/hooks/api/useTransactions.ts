import type { CreateTransactionDto, Transaction, UpdateTransactionDto } from '@account-book/types'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '../../api/axios'

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  totalIncome?: number
  totalExpense?: number
}

export function useTransactions(filters: {
  startDate?: string
  endDate?: string
  type?: string
  counterparty?: string
  tagIds?: string[]
  minAmount?: number
  maxAmount?: number
}) {
  return useInfiniteQuery({
    queryKey: ['transactions', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await apiClient.get<PaginatedResponse<Transaction>>('/v1/transactions', {
        params: { ...filters, page: pageParam, limit: 15 },
      })
      return res.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1
      }
      return undefined
    },
  })
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => {
      const res = await apiClient.get<Transaction>(`/v1/transactions/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateTransactionDto) => apiClient.post<Transaction>('/v1/transactions', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: UpdateTransactionDto }) =>
      apiClient.patch<Transaction>(`/v1/transactions/${id}`, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] })
      await queryClient.invalidateQueries({ queryKey: ['transaction', variables.id] })
    },
  })
}

export function useRemoveTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => apiClient.delete(`/v1/transactions/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

export function useUpdateTransactionTags() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, tagIds, applyToAllSameCounterparty }: { id: string, tagIds: string[], applyToAllSameCounterparty: boolean }) =>
      apiClient.post<Transaction>(`/v1/transactions/${id}/tags`, { tagIds, applyToAllSameCounterparty }),
    onSuccess: async (_, variables) => {
      // 只刷新单条交易缓存，避免触发整个分页列表重新请求
      // 若勾选了「应用到同名商户」，列表缓存也需要同步，但用精确匹配避免重复请求
      await queryClient.invalidateQueries({ queryKey: ['transaction', variables.id] })
      if (variables.applyToAllSameCounterparty) {
        // 批量更新时才刷新列表，且用 refetchType: 'none' 只标记为 stale，
        // 等用户实际访问列表页时再按需请求，而非立即重新 fetch 所有分页
        void queryClient.invalidateQueries({ queryKey: ['transactions'], refetchType: 'none' })
      }
    },
  })
}
