import type { LoginDto, LoginResponse } from '@account-book/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../api/axios'
import { useAuthStore } from '../../stores/auth.store'

export function useLogin() {
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  return useMutation({
    mutationFn: async (data: LoginDto) => apiClient.post<LoginResponse>('/v1/auth/login', data),
    onSuccess: async (data) => {
      if (data?.data?.accessToken && data?.data?.user) {
        login(data.data.accessToken, data.data.user)
        await navigate('/', { replace: true })
      }
    },
  })
}
