import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { UsecasesProxyModule } from '../usecases-proxy/usecase-proxy.module'
import { UseCaseProxy } from '../usecases-proxy/usecase-proxy'
import { LoginUseCases } from 'src/usecases/auth/login.usecase'
import { ExceptionsService } from '../exceptions/exception.service'
import { removeObjectKey } from 'src/helpers/removeKey.helper'
import { UserWithoutPassword } from 'src/domain/model/user'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly LoginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly exceptionService: ExceptionsService
  ) {
    super({ usernameField: 'email' })
  }

  async validate(
    email: string,
    password: string
  ): Promise<UserWithoutPassword> {
    if (!email || !password) {
      this.exceptionService.UnauthorizedException()
    }
    const user =
      await this.LoginUsecaseProxy.getInstance().validateUserForLocalStragtegy(
        email,
        password
      )
    if (!user) {
      this.exceptionService.UnauthorizedException({
        message: 'Invalid email or password.'
      })
    }
    let safeUser = removeObjectKey(user, 'password')
    if (safeUser.hashRefreshToken) {
      safeUser = removeObjectKey(safeUser, 'hashRefreshToken')
    }

    return safeUser
  }
}
