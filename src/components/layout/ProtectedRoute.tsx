import { useAuth } from '@/app/hooks/useAuth'
import { useRoute } from '@/app/hooks/useRoute'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const route = useRoute()

  return isAuthenticated ? <Outlet /> : <Navigate to={route.withSchool().get('/login')} />
}
