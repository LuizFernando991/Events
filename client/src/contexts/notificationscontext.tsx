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
  const api = useApi({ shouldRefreshToken: true })
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [haveNewNotifications, setHavanewNotifications] = useState(false)

  useEffect(() => {
    if (socket) {
      socket.on('notification', (data: Notification) => {
        setNotifications((e) => [data, ...e])
        setHavanewNotifications(true)
        toast({
          variant: 'default',
          title: data.title
        })
      })
    }
  }, [socket])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/notification')
        setNotifications(data)
        if (data.length > 0) {
          setHavanewNotifications(true)
        }
      } catch (err) {
        //
      }
    }
    fetchNotifications()
  }, [api])

  const clearNotification = () => {
    if (notifications.length === 0 || !haveNewNotifications) return
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
