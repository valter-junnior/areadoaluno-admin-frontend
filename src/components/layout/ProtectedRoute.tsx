import { useAuth } from '@/app/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
