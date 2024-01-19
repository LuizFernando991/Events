import useAuth from '@/hooks/useAuth'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectRoutes = () => {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectRoutes
