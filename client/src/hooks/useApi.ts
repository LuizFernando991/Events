import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import axios from 'axios'

export function useApi({
  shouldRefreshToken
}: {
  shouldRefreshToken?: boolean
}) {
  const { removeUserLocalStorage } = useLocalStorage()
  const api = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_KEY,
      withCredentials: true
    })
  }, [])

  if (shouldRefreshToken) {
    let isRefreshing = false

    // Interceptor para capturar erros relacionados ao token
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        // Verifica se o erro é devido a um token expirado
        if (error?.response?.status && error.response.status === 401) {
          // Evita a execução simultânea de várias solicitações de atualização do token
          if (!isRefreshing) {
            isRefreshing = true
            try {
              // Chamada para renovar o token
              const refreshResponse = await api.post('/auth/refresh')
              // Reenvie a solicitação original com o novo token do backend
              originalRequest.headers['Authorization'] =
                `Bearer ${refreshResponse.data.token}`
              return api(originalRequest)
            } catch (refreshError) {
              // Se houver um erro ao renovar o token, deslogar usuário
              removeUserLocalStorage()
              // Redirecionar para a página de login ou fazer algo apropriado
              window.location.href = '/login'
            } finally {
              isRefreshing = false
            }
          }
        }

        return Promise.reject(error)
      }
    )
  }

  return api
}
