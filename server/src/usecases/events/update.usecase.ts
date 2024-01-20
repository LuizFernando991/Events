import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { UpdateEventType } from 'src/domain/types/event.type'

export class UpdateEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async execute(userId: number, eventId: number, eventData: UpdateEventType) {
    if (!eventId) {
      this.exceptionService.badRequestException({
        message: 'invalid id'
      })
    }
    const currentDate = new Date().setHours(0, 0, 0, 0)
    const compareDate = new Date(currentDate)
    if (
      compareDate > new Date(eventData.inicialDate) ||
      compareDate > new Date(eventData.finalDate) ||
      new Date(eventData.inicialDate) > new Date(eventData.finalDate)
    )
      this.exceptionService.badRequestException({
        code_error: 400,
        message: 'invalid date'
      })
    const event = await this.eventRepository.getEvent(eventId)
    if (event.creator.id !== userId) {
      this.exceptionService.forbiddenException()
    }
    const newEvent = await this.eventRepository.update(eventId, eventData)
    return newEvent
  }
}
