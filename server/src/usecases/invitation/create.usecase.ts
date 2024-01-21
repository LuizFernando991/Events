import { IException } from 'src/domain/exceptions/exceptions.interface'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'
import { SocketEmitterInterface } from 'src/domain/socket/SocketEmitter'

export class CreateInvitationUseCases {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly invitationRepository: InvitationRepository,
    private readonly socketService: SocketEmitterInterface,
    private readonly exceptionService: IException
  ) {}

  async create(userId: number, toUsersIds: number[], eventId: number) {
    const event = await this.eventRepository.getEvent(eventId, userId)
    if (!event) {
      this.exceptionService.badRequestException({
        code_error: 404,
        message: 'event not found'
      })
    }
    try {
      const participates =
        await this.eventRepository.getParticipantions(eventId)

      toUsersIds.map(async (toUserId) => {
        if (participates.find((obj) => obj.id === toUserId)) {
          return
        }
        const invite = await this.invitationRepository.create({
          eventId,
          fromUserId: userId,
          toUserId
        })

        this.socketService.emitInvitation(toUserId, invite)
      })
    } catch (err) {
      return
    }
  }
}
