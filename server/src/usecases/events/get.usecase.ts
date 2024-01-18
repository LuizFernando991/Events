import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { GetEventOptionsType } from 'src/domain/types/event.type'

export class GetEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async getEvents(options: GetEventOptionsType): Promise<Event[]> {
    const events = await this.eventRepository.get(options)
    return events
  }
}
