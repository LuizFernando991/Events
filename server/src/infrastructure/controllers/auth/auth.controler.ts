import { Body, Controller, Inject, Post, Request } from '@nestjs/common'
import { Request as RequestExpress } from 'express'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { RegisterUseCases } from 'src/usecases/auth/register.usecase'
import { LoginUseCases } from 'src/usecases/auth/login.usecase'
import { ConfirmRegisterDto, RegisterUserDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USECASES_PROXY)
    private readonly RegisterUsecaseProxy: UseCaseProxy<RegisterUseCases>,
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly LoginUsecaseProxy: UseCaseProxy<LoginUseCases>
  ) {}

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return await this.RegisterUsecaseProxy.getInstance().register(data)
  }

  @Post('confirmRegister')
  async saveUser(
    @Body() data: ConfirmRegisterDto,
    @Request() req: RequestExpress
  ) {
    const { user } = await this.RegisterUsecaseProxy.getInstance().saveUser(
      data.activationToken,
      data.activationCode
    )
    const accessTokenCookie =
      await this.LoginUsecaseProxy.getInstance().getCookieWithJwtToken(
        user.id,
        user.email
      )
    const refreshTokenCookie =
      await this.LoginUsecaseProxy.getInstance().getCookieWithJwtRefreshToken(
        user.id,
        user.email
      )
    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
    return { user }
  }
}
