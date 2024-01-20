import { IException } from 'src/domain/exceptions/exceptions.interface'
import { NotificationRepository } from 'src/domain/repositories/notificationRepositoryInterface'

export class UpdateNotificationUseCases {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly exceptionService: IException
  ) {}

  async setViewed(userId: number) {
    this.notificationRepository.setView(userId)
  }
}
