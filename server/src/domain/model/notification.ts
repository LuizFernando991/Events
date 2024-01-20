export class Notification {
  id: number
  title: string
  description: string
  viewed: boolean
  type: string
  toUserId: number
  aboutEventId: number
  toUser: {
    id: number
    name: string
    username: string
  }
  aboutEvent: {
    name: string
    id: number
  }
}
