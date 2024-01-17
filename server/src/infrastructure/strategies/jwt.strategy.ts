import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { UseCaseProxy } from '../usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from '../usecases-proxy/usecase-proxy.module'
import { LoginUseCases } from 'src/usecases/auth/login.usecase'
import { ExceptionsService } from '../exceptions/exception.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly LoginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly exceptionService: ExceptionsService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication
        }
      ]),
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: any) {
    const user =
      this.LoginUsecaseProxy.getInstance().validateUserForJWTStragtegy(
        payload.username
      )
    if (!user) {
      this.exceptionService.UnauthorizedException({ message: 'User not found' })
    }
    return user
  }
}
