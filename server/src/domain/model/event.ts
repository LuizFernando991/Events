import { UserWithoutPassword } from './user'

export class Event {
  id: number
  name: string
  description: string
  inicialDate: Date
  finalDate: Date
  createdAt: Date
  updatedAt: Date
  participants?: UserWithoutPassword[]
}
