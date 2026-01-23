// Shared types

export interface User {
  id: string
  email: string
  name?: string
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  NO_COUNT = 'noCount',
}

export interface Transaction {
  id: string
  transactionTime: string | Date // ISO Date string or Date object
  transactionCategory?: string
  transactionType: TransactionType
  counterparty?: string
  counterpartyAccount?: string
  productDescription?: string
  amount: number
  paymentMethod?: string
  transactionStatus: string
  transactionOrderNumber?: string
  merchantOrderNumber?: string
  notes?: string
  sourceCard?: string
  userId: string

  // Frontend specific (might need to be separated later or kept optional)
  icon?: string
  currency?: string
}

export interface GroupedTransactions {
  month: string
  totalIncome: number
  totalExpense: number
  transactions: Transaction[]
}

export type CreateTransactionDto = Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'deleteAt' | 'icon' | 'currency'>

export type UpdateTransactionDto = Partial<CreateTransactionDto>

export * from './server/index.js'
