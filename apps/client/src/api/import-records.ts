import type { ImportRecord, ImportRecordResponse } from '@account-book/types'
import axios from './axios'

export const importRecordService = {
  findAll: async (params: { page?: number, limit?: number }) => {
    const res = await axios.get<ImportRecordResponse>('/v1/import-record', { params })
    return res.data
  },

  upload: async (file: File, onUploadProgress?: (progressEvent: any) => void, abortSignal?: AbortSignal) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await axios.post<ImportRecord>('/v1/import-record/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
      signal: abortSignal,
    })
    return res.data
  },
}
