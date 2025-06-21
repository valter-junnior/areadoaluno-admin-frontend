import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '@/app/store'
import { login, logout } from '@/app/store/authSlice'

export function useAuth() {
  const dispatch = useDispatch()

  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = !!token

  const handleLogin = (payload: { token: string; user: any }) => {
    dispatch(login(payload))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    token,
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  }
}
