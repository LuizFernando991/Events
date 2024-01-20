import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import {
  GetEventOptionsType,
  GetEventResType,
  GetEventsResType,
  GetEventsThatUserParticipatesType
} from 'src/domain/types/event.type'

export class GetEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async getEvent(id: number, userId: number): Promise<GetEventResType> {
    const event = await this.eventRepository.getEvent(id, userId)
    return event
  }

  async getEvents(options: GetEventOptionsType): Promise<GetEventsResType> {
    const events = await this.eventRepository.get(options)
    return events
  }

  async getEventsThatUserParticipates(
    options: GetEventsThatUserParticipatesType
  ): Promise<GetEventsResType> {
    const events =
      await this.eventRepository.getEventsThatUserParticipates(options)
    return events
  }

  async getParticipations(id: number) {
    if (!id || typeof id !== 'number') {
      this.exceptionService.badRequestException({
        message: 'invalid id'
      })
    }

    return await this.eventRepository.getParticipantions(id)
  }
}
