import { User } from './User'

export type Event = {
  id: number
  name: string
  description: string
  createdAt: Date
  inicialDate: Date
  finalDate: Date
  creatorId: number
  creator?: Partial<User>
  participants?: Partial<User>[]
  userIsParticipates?: boolean
}

export type FormType = {
  name: string
  description: string
  inicialDate: Date | undefined
  finalDate: Date | undefined
}
