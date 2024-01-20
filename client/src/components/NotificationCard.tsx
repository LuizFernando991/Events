import { Notification } from '@/types/Notification'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export type NotificationCardProps = {
  notification: Notification
}

const NotificationCard: FC<NotificationCardProps> = ({ notification }) => {
  const navigate = useNavigate()
  const redirect = () => {
    if (notification.type === 'updated') {
      navigate(`/event/${notification.aboutEventId}`)
    }
  }
  return (
    <li
      onClick={redirect}
      className={`p-3 w-full border-b border-gray-300 ${notification.type === 'canceled' ? 'bg-rose-100' : 'bg-slate-200 cursor-pointer'}`}
    >
      <div className="flex flex-col text-left">
        <p className="text-sm text-black font-semibold">{notification.title}</p>
      </div>
    </li>
  )
}

export default NotificationCard
