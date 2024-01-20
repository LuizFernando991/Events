import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'

export class ParticipateEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException
  ) {}

  async participate(id: number, userId: number) {
    if (!id) {
      this.exceptionService.badRequestException({
        message: 'invalid id'
      })
    }
    const event = await this.eventRepository.getEvent(id, userId)

    const newEvent = await this.eventRepository.participateEvent(
      id,
      userId,
      event.userIsParticipates
    )

    return newEvent
  }
}
