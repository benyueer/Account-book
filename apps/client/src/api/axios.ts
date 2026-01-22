import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'
import { isSuccessReq } from '../utils'

const apiClient = axios.create({
  baseURL: '/api', // Proxy in vite config will handle this, or set env var
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token && token.trim() !== '') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  async (response) => {
    // 处理成功的响应
    const { data } = response
    // 如果响应体中有 code 字段（即符合我们的标准响应格式）
    if (data && typeof data === 'object' && 'code' in data) {
      const { code, msg } = data
      // 如果不是成功的状态码，返回一个 rejected 的 Promise
      if (!isSuccessReq(code)) {
        const error = new Error(msg || 'Request failed')
        // 将完整的响应数据附加到错误对象上
        ;(error as any).response = {
          ...response,
          data: {
            ...data,
            message: msg, // 为了兼容性，同时提供 message 字段
          },
        }
        return Promise.reject(error)
      }
      // 返回 data 字段，这样在组件中可以直接使用 data
      return {
        ...response,
        data: data.data,
      }
    }
    // 如果不是标准格式的响应，直接返回
    return response
  },
  async (error: any) => {
    // 处理错误响应
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }

    // 标准化错误信息
    if (error.response?.data) {
      const { data } = error.response
      // 如果错误响应符合标准格式
      if (typeof data === 'object' && 'code' in data && 'msg' in data) {
        error.message = data.msg || error.message
      }
      // 确保错误对象包含完整的响应数据
      error.response.data = {
        ...data,
        message: data.msg || data.message || error.message,
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
