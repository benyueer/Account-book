import type { AddLedgerTransactionsDto, CreateLedgerDto, Ledger, QuickAddLedgerTransactionsDto, Transaction, UpdateLedgerDto } from '@account-book/types'
import apiClient from './axios'

export const ledgerApi = {
  findAll: async () => {
    const res = await apiClient.get<Ledger[]>('/v1/ledgers')
    return res.data
  },

  findOne: async (id: string) => {
    const res = await apiClient.get<Ledger>(`/v1/ledgers/${id}`)
    return res.data
  },

  create: async (data: CreateLedgerDto) => {
    const res = await apiClient.post<Ledger>('/v1/ledgers', data)
    return res.data
  },

  update: async (id: string, data: UpdateLedgerDto) => {
    const res = await apiClient.patch<Ledger>(`/v1/ledgers/${id}`, data)
    return res.data
  },

  remove: async (id: string) => {
    await apiClient.delete(`/v1/ledgers/${id}`)
  },

  addTransactions: async (id: string, data: AddLedgerTransactionsDto) => {
    const res = await apiClient.post<{ added: number, skipped: number }>(`/v1/ledgers/${id}/transactions`, data)
    return res.data
  },

  quickAdd: async (id: string, data: QuickAddLedgerTransactionsDto) => {
    const res = await apiClient.post<{ added: number, skipped: number }>(`/v1/ledgers/${id}/quick-add`, data)
    return res.data
  },

  getTransactions: async (id: string) => {
    const res = await apiClient.get<Transaction[]>(`/v1/ledgers/${id}/transactions`)
    return res.data
  },
  removeTransactions: async (id: string, data: { transactionIds: string[] }) => {
    const res = await apiClient.delete(`/v1/ledgers/${id}/transactions`, { data })
    return res.data
  },
}
