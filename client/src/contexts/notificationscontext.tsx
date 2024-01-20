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

export type NotificationsProviderType = {
  notifications: Notification[]
}

const NotificationsContext = createContext({} as NotificationsProviderType)

export const NotificationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useSocket()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('notification', (data: Notification) => {
        setNotifications((e) => [data, ...e])
        toast({
          variant: 'default',
          title: data.title
        })
      })
    }
  }, [socket])

  return (
    <NotificationsContext.Provider value={{ notifications }}>
      {children}
    </NotificationsContext.Provider>
  )
}
