import { useContext } from 'react'
import { NotificationsContext } from '../contexts/notificationscontext'

const useNotification = () => {
  return useContext(NotificationsContext)
}

export default useNotification
