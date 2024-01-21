import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'

export class RespondInvitationUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly invitationRepository: InvitationRepository,
    private readonly exceptionService: IException
  ) {}

  async respond(userId: number, invitationId: number) {
    if (!invitationId || typeof invitationId !== 'number') {
      this.exceptionService.badRequestException({
        message: 'invalid id'
      })
    }
    const invitation =
      await this.invitationRepository.getInvitation(invitationId)

    if (!invitation) {
      this.exceptionService.badRequestException({
        code_error: 404,
        message: 'invitation not found'
      })
    }

    if (invitation.toUserId !== userId) {
      this.exceptionService.forbiddenException()
    }

    if (invitation.status !== 'opening') {
      this.exceptionService.badRequestException({
        message: 'invitation already answered'
      })
    }

    const event = await this.eventRepository.getEvent(
      invitation.eventId,
      userId
    )

    if (!event) {
      this.exceptionService.badRequestException({
        code_error: 404,
        message: 'event not found'
      })
    }

    const newEvent = await this.eventRepository.participateEvent(
      invitation.eventId,
      userId,
      event.userIsParticipates
    )

    return newEvent
  }
}
