import { Notification } from '../model/notification'
import { InvitationRes } from '../types/invitation.types'

export interface SocketEmitterInterface {
  emitNotification(userId: number, data: Notification): void
  emitInvitation(userId: number, data: InvitationRes): void
}
