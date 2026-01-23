import type { ImportRecord, ImportRecordResponse } from '@account-book/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '../../api/axios'

export function useImportRecords(params: { page?: number, limit?: number }) {
  return useQuery({
    queryKey: ['importRecords', params],
    queryFn: async () => {
      const res = await apiClient.get<ImportRecordResponse>('/v1/import-record', { params })
      return res.data
    },
  })
}

export function useUploadRecord() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ file, onUploadProgress, abortSignal }: {
      file: File
      onUploadProgress?: (progressEvent: any) => void
      abortSignal?: AbortSignal
    }) => {
      const formData = new FormData()
      formData.append('file', file)
      const res = await apiClient.post<ImportRecord>('/v1/import-record/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
        signal: abortSignal,
      })
      return res.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['importRecords'] })
      await queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
