import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { Event } from 'src/domain/model/event'

export class DeleteEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async execulte(currentUserId: number, id: number): Promise<Event> {
    const event = await this.eventRepository.getEvent(id, currentUserId)
    if (!event) {
      this.exceptionService.badRequestException({
        code_error: 404,
        message: 'evento not found'
      })
    }
    if (event.creator.id !== currentUserId) {
      this.exceptionService.forbiddenException()
    }
    const deletedEvent = await this.eventRepository.delete(id)
    return deletedEvent
  }
}
