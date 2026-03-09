import type { Card, CreateCardDto, UpdateCardDto } from '@account-book/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '../../api/axios'

export function useCards() {
  return useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const res = await apiClient.get<Card[]>('/v1/cards')
      return res.data
    },
  })
}

export function useCard(id: string) {
  return useQuery({
    queryKey: ['card', id],
    queryFn: async () => {
      const res = await apiClient.get<Card>(`/v1/cards/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateCardDto) => apiClient.post<Card>('/v1/cards', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}

export function useUpdateCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: UpdateCardDto }) =>
      apiClient.patch<Card>(`/v1/cards/${id}`, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['cards'] })
      await queryClient.invalidateQueries({ queryKey: ['card', variables.id] })
    },
  })
}

export function useRemoveCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => apiClient.delete(`/v1/cards/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}
