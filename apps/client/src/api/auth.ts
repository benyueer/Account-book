import apiClient from './axios'

export interface LoginDto {
  name: string
  password?: string
}

export interface AuthResponse {
  accessToken: string
  user: {
    id: string
    name: string
  }
}

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/v1/auth/login', data)
    return response.data
  },

  // Future: register, me, etc.
}
