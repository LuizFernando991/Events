import { Module } from '@nestjs/common'
import { UsecasesProxyModule } from '../usecases-proxy/usecase-proxy.module'
import { AuthController } from './auth/auth.controler'
import { EventController } from './events/event.controler'

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, EventController]
})
export class ControllersModule {}
