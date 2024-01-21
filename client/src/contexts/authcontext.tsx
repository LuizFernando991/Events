import { createContext, useState, FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/User'
import { useApi } from '../hooks/useApi'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToast } from '@/components/ui/use-toast'

export type UserFormType = {
  email: string
  password: string
}

export type UserRegisterFormType = {
  email: string
  password: string
}

export type UserConfirmRegisterType = {
  activationCode: string
  activationToken: string
}

export type AuthProviderType = {
  user: User | null
  login: (data: UserFormType) => Promise<void>
  register: (data: UserRegisterFormType) => Promise<string | null>
  confirmRegister: (data: UserConfirmRegisterType) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

export const AuthContext = createContext({} as AuthProviderType)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUserLocalStorage, removeUserLocalStorage, getUserLocalStorage } =
    useLocalStorage()
  const [user, setUser] = useState<User | null>(getUserLocalStorage())
  const navigate = useNavigate()
  const { toast } = useToast()
  const api = useApi({ shouldRefreshToken: false })

  const login = async (userForm: UserFormType) => {
    try {
      const { data } = await api.post('/auth/login', userForm)
      setUserLocalStorage(data.user)
      setUser(data.user)
      navigate('/dashboard')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast({
          variant: 'destructive',
          title: 'Email ou senha inválidos'
        })
        return
      }
      toast({
        variant: 'destructive',
        title: 'Ah não! Algo deu errado, tente mais tarde.'
      })
      return
    }
  }

  const register = async (
    userRegisterFomr: UserRegisterFormType
  ): Promise<string | null> => {
    let token: string | null = null
    try {
      const { data }: { data: { activationToken: string } } = await api.post(
        '/auth/register',
        userRegisterFomr
      )
      token = data.activationToken
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // console.log(err)
      if (err.response?.status === 400) {
        toast({
          variant: 'destructive',
          title: 'Usuário já cadastrado, tente outro usename ou email'
        })
        return null
      }
      toast({
        variant: 'destructive',
        title: 'Ah não! Algo deu errado, tente mais tarde.'
      })
    }
    return token
  }

  const confirmRegister = async (
    confirmRequestData: UserConfirmRegisterType
  ) => {
    try {
      const { data } = await api.post(
        '/auth/confirmRegister',
        confirmRequestData
      )
      setUserLocalStorage(data.user)
      setUser(data.user)
      navigate('/dashboard')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast({
          variant: 'destructive',
          title: 'Código não corresponde.'
        })
      }
    }
  }

  const logout = async () => {
    try {
      api.post('/auth/logout')
      removeUserLocalStorage()
      setUser(null)
      navigate('/login')
    } catch (err) {
      return
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser, register, confirmRegister }}
    >
      {children}
    </AuthContext.Provider>
  )
}
