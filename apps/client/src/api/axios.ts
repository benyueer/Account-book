import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'

const apiClient = axios.create({
  baseURL: '/api', // Proxy in vite config will handle this, or set env var
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  },
)

export default apiClient
