import { useContext } from 'react'
import { AuthContext } from '../contexts/authcontext'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
