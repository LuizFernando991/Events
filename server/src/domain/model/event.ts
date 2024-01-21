export class Event {
  id: number
  name: string
  description: string
  inicialDate: Date
  finalDate: Date
  createdAt: Date
  updatedAt: Date
  inicialTime: string
  finalTime: string
  participants?: { id: number; name: string; username: string }[]
  creator: {
    id: number
    name: string
    username: string
  }
}
