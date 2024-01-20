import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { NotificationRepository } from 'src/domain/repositories/notificationRepositoryInterface'
import { Notification } from 'src/domain/model/notification'
import { RegisterNotificationType } from 'src/domain/types/notification.types'

@Injectable()
export class DatabaseNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RegisterNotificationType): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data,
      select: {
        id: true,
        title: true,
        description: true,
        viewed: true,
        type: true,
        toUserId: true,
        aboutEventId: true,
        toUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        aboutEvent: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return notification
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        toUserId: userId
      },
      select: {
        id: true,
        title: true,
        description: true,
        viewed: true,
        type: true,
        toUserId: true,
        aboutEventId: true,
        toUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        aboutEvent: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }
}
