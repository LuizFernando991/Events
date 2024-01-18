import { createContext, useState, FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/User'
import { useApi } from '../hooks/useApi'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type UserFormType = {
  email: string
  password: string
}

export type UserRegisterFormType = {
  email: string
  password: string
}

export type AuthProviderType = {
  user: User | null
  login: (data: UserFormType) => Promise<void>
  register: (data: UserRegisterFormType) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

export const AuthContext = createContext({} as AuthProviderType)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUserLocalStorage, removeUserLocalStorage, getUserLocalStorage } =
    useLocalStorage()
  const [user, setUser] = useState<User | null>(getUserLocalStorage())
  const navigate = useNavigate()

  const api = useApi()

  const login = async (userForm: UserFormType) => {
    try {
      const { data } = await api.post('login', userForm)
      setUserLocalStorage(data.user)
      setUser(data.user)
      navigate('/dashbord')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        // toast.error('Email ou senha inválida')
        return
      }
      // toast.error('Algo deu errado, tente mais tarde')
    }
  }

  const register = async (userRegisterFomr: UserRegisterFormType) => {
    try {
      const { data } = await api.post('register', userRegisterFomr)
      setUser(data.user)
      navigate('/dashbord')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 400) {
        // toast.error('Email ou senha utilizados')
        return
      }
    }
  }

  const logout = () => {
    removeUserLocalStorage()
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, register }}>
      {children}
    </AuthContext.Provider>
  )
}
