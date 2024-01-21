import { IException } from 'src/domain/exceptions/exceptions.interface'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'

export class GetInvitationUseCases {
  constructor(
    private readonly invitationRepository: InvitationRepository,
    private readonly exceptionService: IException
  ) {}

  async getUserInvitations(userId: number) {
    try {
      return await this.invitationRepository.getUserInvitations(userId)
    } catch (err) {
      this.exceptionService.internalServerErrorException()
    }
  }
}
