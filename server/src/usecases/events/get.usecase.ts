import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import {
  GetEventOptionsType,
  GetEventsThetUserParticipatesType
} from 'src/domain/types/event.type'
import { Event } from 'src/domain/model/event'

export class GetEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async getEvents(options: GetEventOptionsType): Promise<Event[]> {
    const events = await this.eventRepository.get(options)
    return events
  }

  async getEventsThatUserParticipates(
    options: GetEventsThetUserParticipatesType
  ): Promise<Event[]> {
    const events =
      await this.eventRepository.getEventsThatUserParticipates(options)
    return events
  }
}
