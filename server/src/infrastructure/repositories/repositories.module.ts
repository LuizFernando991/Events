import { Module } from '@nestjs/common'
import { DatabaseUserRepository } from './user.repository'
import { PrismaModule } from '../db/prisma.module'
import { DatabaseEventRepository } from './event.repository'
import { DatabaseNotificationRepository } from './notification.repository'
import { DatabaseInvitationRepository } from './invitation.repository'

@Module({
  imports: [PrismaModule],
  providers: [
    DatabaseUserRepository,
    DatabaseEventRepository,
    DatabaseNotificationRepository,
    DatabaseInvitationRepository
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseEventRepository,
    DatabaseNotificationRepository,
    DatabaseInvitationRepository
  ]
})
export class RepositoriesModule {}
