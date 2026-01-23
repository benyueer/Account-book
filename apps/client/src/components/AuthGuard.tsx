import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/auth.store'

export function AuthGuard() {
  const token = useAuthStore(state => state.token)
  const isAuthenticated = Boolean(token && token.trim() !== '')
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
