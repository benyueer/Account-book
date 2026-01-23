import type { CreateTransactionDto, Transaction, UpdateTransactionDto } from '@account-book/types'
import axios from './axios'

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  totalIncome?: number
  totalExpense?: number
}

export const transactionService = {
  findAll: async (params: { page: number, limit: number, startDate?: string, endDate?: string, type?: string }) => {
    const response = await axios.get<PaginatedResponse<Transaction>>('/v1/transactions', { params })
    return response.data
  },

  findOne: async (id: string) => {
    const response = await axios.get<Transaction>(`/v1/transactions/${id}`)
    return response.data
  },

  create: async (data: CreateTransactionDto) => {
    const response = await axios.post<Transaction>('/v1/transactions', data)
    return response.data
  },

  update: async (id: string, data: UpdateTransactionDto) => {
    const response = await axios.patch<Transaction>(`/transactions/${id}`, data)
    return response.data
  },

  remove: async (id: string) => {
    await axios.delete(`/transactions/${id}`)
  },
}
