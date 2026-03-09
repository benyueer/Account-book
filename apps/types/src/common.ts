export interface BaseResponse<T = unknown> {
  code: number
  data: T
  msg: string
  timestamp?: string
  path?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
