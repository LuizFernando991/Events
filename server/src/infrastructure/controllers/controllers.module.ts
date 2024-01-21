import { Module } from '@nestjs/common'
import { UsecasesProxyModule } from '../usecases-proxy/usecase-proxy.module'
import { AuthController } from './auth/auth.controler'
import { EventController } from './events/event.controler'
import { NotificationController } from './notification/notification.controller'
import { UserController } from './user/user.controller'

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    AuthController,
    EventController,
    NotificationController,
    UserController
  ]
})
export class ControllersModule {}
