import { Module } from '@nestjs/common'
import { DatabaseUserRepository } from './user.repository'
import { PrismaModule } from '../db/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository]
})
export class RepositoriesModule {}
