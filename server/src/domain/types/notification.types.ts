export type RegisterNotificationType = {
  title: string
  description: string
  type: 'canceled' | 'updated' | 'acceptInvitation' | 'rejectInvitation'
  toUserId: number
  aboutEventId: number
}
