import { Event } from '../model/event'

export type RegisterEventType = {
  name: string
  creatorId: number
  description: string
  inicialDate: Date
  finalDate: Date
}

export type GetEventOptionsType = {
  creatorId?: number
  page?: number
  search?: string
  inicialDate?: Date
  finalDate?: Date
}

export type GetEventsThatUserParticipatesType = {
  userId: number
  page?: number
  search?: string
  inicialDate?: Date
  finalDate?: Date
}

export type GetEventsThatUserParticipatesResType = {
  events: Event[]
  pages: number
  currentPage: number
}
