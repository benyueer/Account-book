import apiClient from './axios'

export interface LoginDto {
  name: string
  password?: string
}

export interface UserInfo {
  id: string
  name: string
}

export interface AuthData {
  accessToken: string
  user: UserInfo
}

export interface BaseResponse<T = any> {
  code: number
  data: T
  msg: string
}

export type AuthResponse = BaseResponse<AuthData>

// 登录接口返回的数据结构
export interface LoginResponse extends AuthData {}

// 登录接口的响应类型
export type LoginApiResponse = BaseResponse<LoginResponse>

export const authApi = {
  login: async (data: LoginDto): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginApiResponse>('/v1/auth/login', data)
    // 由于我们在 axios 拦截器中已经处理了响应，这里直接返回 data
    return response.data as unknown as LoginResponse
  },

  // Future: register, me, etc.
}
