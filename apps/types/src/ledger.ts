import type { Transaction } from './transaction.js'

export interface Ledger {
  id: string
  name: string
  description?: string
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export interface LedgerTransaction {
  id: string
  ledgerId: string
  transactionId: string
  transaction?: Transaction
}

export interface CreateLedgerDto {
  name: string
  description?: string
}

export interface UpdateLedgerDto {
  name?: string
  description?: string
}

export interface AddLedgerTransactionsDto {
  transactionIds: string[]
}

export interface QuickAddLedgerTransactionsDto {
  merchantNames?: string[]
  tagIds?: string[]
  startDate?: string
  endDate?: string
}
