import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from 'react'
import useSocket from '../hooks/useSocket'
import { toast } from '@/components/ui/use-toast'
import { Notification } from '@/types/Notification'
import { useApi } from '@/hooks/useApi'
import useAuth from '@/hooks/useAuth'

export type NotificationsProviderType = {
  notifications: Notification[]
  haveNewNotifications: boolean
  clearNotification: () => void
}

export const NotificationsContext = createContext(
  {} as NotificationsProviderType
)

export const NotificationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useSocket()
  const { user } = useAuth()
  const api = useApi({ shouldRefreshToken: true })
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [haveNewNotifications, setHavanewNotifications] = useState(false)

  useEffect(() => {
    if (socket && user) {
      socket.on('notification', (data: Notification) => {
        setNotifications((e) => [data, ...e])
        setHavanewNotifications(true)
        toast({
          variant: 'default',
          title: data.title
        })
      })
    }
  }, [socket, user])

  useEffect(() => {
    if (!user) return
    const controller = new AbortController()
    const signal = controller.signal
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/notification', { signal })
        setNotifications(data)
        if (data.length > 0) {
          setHavanewNotifications(true)
        }
      } catch (err) {
        //
      }
    }
    fetchNotifications()
    return () => {
      controller.abort()
    }
  }, [api, user])

  const clearNotification = () => {
    if (notifications.length === 0 || !haveNewNotifications || !user) return
    setHavanewNotifications(false)
    api.put('/notification/viewed')
  }

  return (
    <NotificationsContext.Provider
      value={{ notifications, haveNewNotifications, clearNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
