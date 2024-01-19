import { User } from './User'

export type Event = {
  id: number
  name: string
  description: string
  createdAt: Date
  inicialDate: Date
  FinalDate: Date
  creatorId: number
  creator?: Partial<User>
  participants?: Partial<User>[]
}
