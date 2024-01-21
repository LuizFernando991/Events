import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'

export class CreateInvitationUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly invitationRepository: InvitationRepository,
    private readonly exceptionService: IException
  ) {}

  async create(userId: number, toUserId: number, eventId: number) {
    const event = await this.eventRepository.getEvent(eventId, toUserId)

    if (!event) {
      this.exceptionService.badRequestException({
        code_error: 404,
        message: 'invitation not found'
      })
    }

    if (event.userIsParticipates) {
      this.exceptionService.badRequestException({
        message: 'user already participates'
      })
    }

    return this.invitationRepository.create({
      eventId,
      fromUserId: userId,
      toUserId
    })
  }
}
