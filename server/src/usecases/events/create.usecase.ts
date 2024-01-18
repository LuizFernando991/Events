import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { RegisterEventType } from 'src/domain/types/event.type'

export class CreateEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async execute(eventData: RegisterEventType) {
    await this.eventRepository.insert(eventData)
  }
}
