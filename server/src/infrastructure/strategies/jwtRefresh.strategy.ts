import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { UsecasesProxyModule } from '../usecases-proxy/usecase-proxy.module'
import { UseCaseProxy } from '../usecases-proxy/usecase-proxy'
import { LoginUseCases } from 'src/usecases/auth/login.usecase'
import { IJwtServicePayload } from 'src/domain/adapters/jwt.interface'
import { ExceptionsService } from '../exceptions/exception.service'
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly enviromentService: EnvironmentConfigService,
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly LoginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly exceptionService: ExceptionsService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh
        }
      ]),
      secretOrKey: enviromentService.getJwtRefreshSecret(),
      passReqToCallback: true
    })
  }

  async validate(request: Request, payload: IJwtServicePayload) {
    const refreshToken = request.cookies?.Refresh
    const user =
      this.LoginUsecaseProxy.getInstance().getUserIfRefreshTokenMatches(
        refreshToken,
        payload.username
      )
    if (!user) {
      this.exceptionService.UnauthorizedException({
        message: 'User not found or hash not correct'
      })
    }
    return user
  }
}
