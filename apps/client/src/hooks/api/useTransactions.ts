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

export function useTransactions(filters: { startDate?: string, endDate?: string, type?: string }) {
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
