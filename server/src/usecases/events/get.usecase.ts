import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import {
  GetEventOptionsType,
  GetEventsThatUserParticipatesResType,
  GetEventsThatUserParticipatesType
} from 'src/domain/types/event.type'

export class GetEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async getEvents(
    options: GetEventOptionsType
  ): Promise<GetEventsThatUserParticipatesResType> {
    const events = await this.eventRepository.get(options)
    return events
  }

  async getEventsThatUserParticipates(
    options: GetEventsThatUserParticipatesType
  ): Promise<GetEventsThatUserParticipatesResType> {
    const events =
      await this.eventRepository.getEventsThatUserParticipates(options)
    return events
  }
}
