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

export type GetEventsThetUserParticipatesType = {
  userId: number
  page?: number
  search?: string
  inicialDate?: Date
  finalDate?: Date
}
