import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { RegisterEventType } from 'src/domain/types/event.type'

export class CreateEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async execute(eventData: RegisterEventType) {
    const currentDate = new Date().setHours(0, 0, 0, 0)
    const compareDate = new Date(currentDate)
    if (
      compareDate > eventData.inicialDate ||
      compareDate > eventData.finalDate ||
      eventData.inicialDate > eventData.finalDate
    )
      this.exceptionService.badRequestException({
        code_error: 400,
        message: 'invalid date'
      })
    return await this.eventRepository.insert(eventData)
  }
}
