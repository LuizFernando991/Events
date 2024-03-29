import { Event } from '../model/event'

export type RegisterEventType = {
  name: string
  creatorId: number
  description: string
  inicialDate: string
  finalDate: string
  inicialTime: string
  finalTime: string
}

export type GetEventOptionsType = {
  creatorId?: number
  page?: number
  search?: string
  inicialDate?: string
  finalDate?: string
}

export type GetEventsThatUserParticipatesType = {
  userId: number
  page?: number
  search?: string
  inicialDate?: string
  finalDate?: string
}

export type GetEventsResType = {
  events: Event[]
  pages: number
  currentPage: number
}

export type GetEventResType = Event & {
  userIsParticipates: boolean
}

export type UpdateEventType = Partial<RegisterEventType>
