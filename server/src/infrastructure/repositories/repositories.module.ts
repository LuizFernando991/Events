import { Module } from '@nestjs/common'
import { DatabaseUserRepository } from './user.repository'
import { PrismaModule } from '../db/prisma.module'
import { DatabaseEventRepository } from './event.repository'
import { DatabaseNotificationRepository } from './notification.repository'

@Module({
  imports: [PrismaModule],
  providers: [
    DatabaseUserRepository,
    DatabaseEventRepository,
    DatabaseNotificationRepository
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseEventRepository,
    DatabaseNotificationRepository
  ]
})
export class RepositoriesModule {}
