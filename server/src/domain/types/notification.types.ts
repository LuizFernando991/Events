export type RegisterNotificationType = {
  title: string
  description: string
  type: 'canceled' | 'updated'
  toUserId: number
  aboutEventId: number
}
