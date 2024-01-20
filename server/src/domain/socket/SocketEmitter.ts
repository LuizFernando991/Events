import { Notification } from '../model/notification'

export interface SocketEmitterInterface {
  emitNotification(userId: number, data: Notification): void
}
