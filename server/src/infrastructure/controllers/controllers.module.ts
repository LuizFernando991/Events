import { Module } from '@nestjs/common'
import { UsecasesProxyModule } from '../usecases-proxy/usecase-proxy.module'
import { AuthController } from './auth/auth.controler'

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController]
})
export class ControllersModule {}
