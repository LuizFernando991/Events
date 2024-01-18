import { Module } from '@nestjs/common'
import { DatabaseUserRepository } from './user.repository'
import { PrismaModule } from '../db/prisma.module'
import { DatabaseEventRepository } from './event.repository'

@Module({
  imports: [PrismaModule],
  providers: [DatabaseUserRepository, DatabaseEventRepository],
  exports: [DatabaseUserRepository, DatabaseEventRepository]
})
export class RepositoriesModule {}
