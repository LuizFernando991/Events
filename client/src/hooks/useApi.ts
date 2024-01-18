import { useLocalStorage } from './useLocalStorage'
import axios from 'axios'

export function useApi() {
  const { removeUserLocalStorage } = useLocalStorage()
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    withCredentials: true
  })

  // Interceptor para capturar erros relacionados ao token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // Verifica se o erro é devido a um token expirado
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          console.log('refresh_token')
          // Faça uma chamada para renovar o token
          const refreshResponse = await api.post('/auth/refresh')
          console.log(refreshResponse)
          // Atualize o token no backend (se necessário)

          // Reenvie a solicitação original com o novo token do backend
          originalRequest.headers['Authorization'] =
            `Bearer ${refreshResponse.data.token}`
        } catch (refreshError) {
          // Se houver um erro ao renovar o token, redirecione para a página de login ou faça algo apropriado
          console.error('Erro ao renovar token:', refreshError)
          removeUserLocalStorage()
          window.location.href = '/login'
          // Redirecionar para a página de login ou fazer algo apropriado
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
