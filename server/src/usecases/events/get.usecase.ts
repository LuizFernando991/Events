import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import {
  GetEventOptionsType,
  GetEventsResType,
  GetEventsThatUserParticipatesType
} from 'src/domain/types/event.type'
import { Event } from 'src/domain/model/event'

export class GetEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async getEvent(id: number): Promise<Event> {
    const event = await this.eventRepository.getEvent(id)
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
}
