export class Event {
  id: number
  name: string
  description: string
  inicialDate: Date
  finalDate: Date
  createdAt: Date
  updatedAt: Date
  participants?: { id: number; name: string; username: string }[]
  creator?: {
    name: string
    username: string
  }
}
