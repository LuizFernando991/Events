import { IException } from 'src/domain/exceptions/exceptions.interface'
import { NotificationRepository } from 'src/domain/repositories/notificationRepositoryInterface'

export class GetNotificationUseCases {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly exceptionService: IException
  ) {}

  async execute(userId: number) {
    const notifications =
      await this.notificationRepository.getUserNotifications(userId)

    return notifications
  }
}
