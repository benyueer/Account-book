export enum ImportRecordStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface ImportRecordMetadata {
  title?: string
  nickname?: string
  startTime?: string | Date
  endTime?: string | Date
  exportTime?: string | Date
  totalIncomeCount?: number
  totalIncomeCost?: number
  totalExpenseCount?: number
  totalExpenseCost?: number
  billNotes?: string
}

export interface ImportRecord extends ImportRecordMetadata {
  id: string
  fileName: string
  fileType: string
  status: ImportRecordStatus
  totalCount: number
  successCount: number
  failCount: number
  errorMessage?: string
  importTime: string | Date
  createdAt: string | Date
  userId: string

  // // 元数据信息
  // title?: string
  // nickname?: string
  // startTime?: string | Date
  // endTime?: string | Date
  // exportTime?: string | Date
  // totalIncomeCount?: number
  // totalIncomeCost?: number
  // totalExpenseCount?: number
  // totalExpenseCost?: number
  // billNotes?: string
}

export interface ImportRecordResponse {
  items: ImportRecord[]
  total: number
  page: number
  limit: number
  totalPages: number
}
