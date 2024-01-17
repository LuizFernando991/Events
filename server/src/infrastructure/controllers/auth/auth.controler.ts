import { Body, Controller, Inject, Post } from '@nestjs/common'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { RegisterUseCases } from 'src/usecases/auth/register.usecase'
import { ConfirmRegisterDto, RegisterUserDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USECASES_PROXY)
    private readonly RegisterUsecaseProxy: UseCaseProxy<RegisterUseCases>
  ) {}

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return await this.RegisterUsecaseProxy.getInstance().register(data)
  }

  @Post('confirmRegister')
  async saveUser(@Body() data: ConfirmRegisterDto) {
    return await this.RegisterUsecaseProxy.getInstance().saveUser(
      data.activationToken,
      data.activationCode
    )
  }
}
