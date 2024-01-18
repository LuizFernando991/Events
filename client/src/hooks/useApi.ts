import { useLocalStorage } from './useLocalStorage'
import axios from 'axios'

export function useApi({
  shouldRefreshToken
}: {
  shouldRefreshToken?: boolean
}) {
  const { removeUserLocalStorage } = useLocalStorage()
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    withCredentials: true
  })

  if (shouldRefreshToken) {
    let isRefreshing = false
    let refreshPromise: Promise<void> | null = null

    // Interceptor para capturar erros relacionados ao token
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // Verifica se o erro é devido a um token expirado
        if (error.response.status === 401) {
          // Evita a execução simultânea de várias solicitações de atualização do token
          if (!isRefreshing) {
            isRefreshing = true
            try {
              console.log('refresh_token')
              // Faça uma chamada para renovar o token
              const refreshResponse = await api.post('/auth/refresh')
              console.log(refreshResponse)
              // Atualize o token no backend (se necessário)

              // Reenvie a solicitação original com o novo token do backend
              originalRequest.headers['Authorization'] =
                `Bearer ${refreshResponse.data.token}`
              return api(originalRequest)
            } catch (refreshError) {
              // Se houver um erro ao renovar o token, redirecione para a página de login ou faça algo apropriado
              console.error('Erro ao renovar token:', refreshError)
              removeUserLocalStorage()
              window.location.href = '/login'
              // Redirecionar para a página de login ou fazer algo apropriado
            } finally {
              isRefreshing = false
            }
          } else {
            // Se já há uma solicitação de atualização do token em andamento, aguarde até que ela seja concluída
            if (!refreshPromise) {
              refreshPromise = new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                  if (!isRefreshing) {
                    clearInterval(checkInterval)
                    resolve()
                  }
                }, 100)
              })
            }
            await refreshPromise
            refreshPromise = null
            // Reenvie a solicitação original após a atualização do token
            return api(originalRequest)
          }
        }

        return Promise.reject(error)
      }
    )
  }

  return api
}
