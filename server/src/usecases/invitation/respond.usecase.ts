import { IJwtServicePayload } from 'src/domain/adapters/jwt.interface'
import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'
import { NotificationRepository } from 'src/domain/repositories/notificationRepositoryInterface'
import { SocketEmitterInterface } from 'src/domain/socket/SocketEmitter'

export class RespondInvitationUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly invitationRepository: InvitationRepository,
    private readonly exceptionService: IException,
    private readonly notificationRepository: NotificationRepository,
    private readonly socketService: SocketEmitterInterface
  ) {}

  async respond(
    user: IJwtServicePayload,
    invitationId: number,
    accept: boolean
  ) {
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

    if (invitation.toUserId !== user.id) {
      this.exceptionService.forbiddenException()
    }

    if (invitation.status !== 'opening') {
      this.exceptionService.badRequestException({
        message: 'invitation already answered'
      })
    }

    await this.invitationRepository.respondInvitation(invitationId, accept)

    const event = await this.eventRepository.getEvent(
      invitation.eventId,
      user.id
    )

    if (!event) {
      this.exceptionService.badRequestException({
        code_error: 404,
        message: 'event not found'
      })
    }

    if (accept) {
      const notification = await this.notificationRepository.create({
        title: `${user.username} aceitou seu convite para: ${event.name}`,
        description: `${user.username} aceitou seu convite para: ${event.name}`,
        type: 'acceptInvitation',
        toUserId: event.creator.id,
        aboutEventId: event.id
      })
      this.socketService.emitNotification(event.creator.id, notification)
      await this.eventRepository.participateEvent(
        invitation.eventId,
        user.id,
        event.userIsParticipates
      )
      return
    }
    const notification = await this.notificationRepository.create({
      title: `${user.username} recusou seu convite para: ${event.name}`,
      description: `${user.username} recusou seu convite para: ${event.name}`,
      type: 'rejectInvitation',
      toUserId: event.creator.id,
      aboutEventId: event.id
    })
    this.socketService.emitNotification(event.creator.id, notification)
    return
  }
}
