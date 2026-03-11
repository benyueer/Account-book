import type { Tag } from './tag'

export enum TransactionSource {
  WECHAT = '微信导入',
  ALIPAY = '支付宝导入',
  IMPORT = '导入',
  MANUAL = '手动添加',
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
  tags?: Tag[]

  // Frontend specific (might need to be separated later or kept optional)
  icon?: string
  currency?: string

  importRecordId?: string
  source?: TransactionSource
}

export interface GroupedTransactions {
  date: string
  totalIncome: number
  totalExpense: number
  transactions: Transaction[]
}

export type CreateTransactionDto = Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'deleteAt' | 'icon' | 'currency'>

export type UpdateTransactionDto = Partial<CreateTransactionDto>
export type ParsedTransaction = Omit<Transaction, 'id' | 'userId'> & { source: TransactionSource }
