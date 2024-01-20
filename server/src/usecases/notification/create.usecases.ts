import { IException } from 'src/domain/exceptions/exceptions.interface'
import { NotificationRepository } from 'src/domain/repositories/notificationRepositoryInterface'
import { Event } from 'src/domain/model/event'
// import { RegisterNotificationType } from 'src/domain/types/notification.types'

type DataType = Pick<Event, 'participants'> & {
  title: string
  description: string
  type: 'canceled' | 'updated'
  aboutEventId?: number
}

export class CreateNotificationUseCases {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly exceptionService: IException,
    private readonly socketService: any
  ) {}

  async execute(data: DataType) {
    data.participants.map(async (user) => {
      const notification = await this.notificationRepository.create({
        title: data.title,
        description: data.title,
        type: data.type,
        aboutEventId: data.aboutEventId ? data.aboutEventId : undefined,
        toUserId: user.id
      })
      this.socketService.emitNotification(user.id, notification)
    })
  }
}
