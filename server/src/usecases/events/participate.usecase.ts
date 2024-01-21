import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'

export class ParticipateEventUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: IException,
    private readonly invitationRepository: InvitationRepository
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

    //Removing invitations
    return newEvent
  }
}
