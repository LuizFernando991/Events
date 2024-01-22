import { Event } from '../model/event'

export type RegisterInvitationType = {
  eventId: number
  fromUserId: number
  toUserId: number
}

export type InvitationRes = {
  id: number
  eventId: number
  fromUserId: number
  toUserId: number
  status: 'opening' | 'rejected' | 'accept'
  fromUser: {
    id: number
    name: string
    username: string
  }
  toUser: {
    id: number
    name: string
    username: string
  }
  event: Event
}
