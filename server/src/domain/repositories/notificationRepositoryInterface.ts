import { Notification } from '../model/notification'
import { RegisterNotificationType } from '../types/notification.types'

export interface NotificationRepository {
  getUserNotifications(userId: number): Promise<Notification[]>
  create(data: RegisterNotificationType): Promise<Notification>
}
