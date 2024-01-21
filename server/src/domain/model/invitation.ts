import { UserWithoutPassword } from './user'

export class Invitation {
  id: number
  status: 'opening' | 'rejected' | 'accept'
  eventId: number
  fromUserId: number
  toUserId: number

  toUser: UserWithoutPassword
  fromUser = UserWithoutPassword
}
