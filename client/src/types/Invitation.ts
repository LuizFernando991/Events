import { Event } from './Event'

export type Invitation = {
  id: number
  eventId: number
  fromUserId: number
  toUserId: number
  status: string
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
