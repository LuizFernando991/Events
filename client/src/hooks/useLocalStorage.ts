import { User } from '../types/User'

export const useLocalStorage = () => {
  const setUserLocalStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  const getUserLocalStorage = (): User | null => {
    const json = localStorage.getItem('user')
    if (!json) {
      return null
    }
    const user = JSON.parse(json)
    return user ?? null
  }

  const removeUserLocalStorage = () => {
    localStorage.removeItem('user')
  }

  return {
    setUserLocalStorage,
    getUserLocalStorage,
    removeUserLocalStorage
  }
}
