import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './infrastructure/db/prisma.module'
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    EnvironmentConfigModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
