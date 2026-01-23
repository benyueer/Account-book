export enum ImportRecordStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface ImportRecord {
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
}

export interface ImportRecordResponse {
  items: ImportRecord[]
  total: number
  page: number
  limit: number
  totalPages: number
}
