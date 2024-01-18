import { DynamicModule, Module } from '@nestjs/common'
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module'
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service'
import { JwtTokenService } from '../services/jwt/jwt.service'
import { UseCaseProxy } from './usecase-proxy'
import { RegisterUseCases } from 'src/usecases/auth/register.usecase'
import { JwtModule } from '../services/jwt/jwt.module'
import { RepositoriesModule } from '../repositories/repositories.module'
import { DatabaseUserRepository } from '../repositories/user.repository'
import { EmailService } from '../services/email/email.service'
import { EmailModule } from '../services/email/email.module'
import { HashService } from '../services/hash/hash.service'
import { HashModule } from '../services/hash/hash.module'
import { LoginUseCases } from 'src/usecases/auth/login.usecase'
import { ExceptionsService } from '../exceptions/exception.service'
import { ExceptionsModule } from '../exceptions/exceptions.module'
import { LogoutUseCases } from 'src/usecases/auth/logout.usercase'
import { DatabaseEventRepository } from '../repositories/event.repository'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { CreateEventUseCases } from 'src/usecases/events/create.usecase'
import { GetEventUseCases } from 'src/usecases/events/get.usecase'

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtModule,
    RepositoriesModule,
    EmailModule,
    HashModule,
    ExceptionsModule
  ]
})
export class UsecasesProxyModule {
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy'
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy'
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy'
  static EVENT_CREATE_PROXY = 'EventCreateUseCasesProxy'
  static EVENT_GET_PROXY = 'EventGetUseCasesProxy'

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            EmailService,
            HashService,
            ExceptionsService
          ],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (
            jwtTokenService: JwtTokenService,
            enviromentConfig: EnvironmentConfigService,
            userRepository: DatabaseUserRepository,
            emailSender: EmailService,
            hashService: HashService,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new RegisterUseCases(
                jwtTokenService,
                enviromentConfig,
                userRepository,
                emailSender,
                hashService,
                exceptionService
              )
            )
        },
        {
          inject: [
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            HashService
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            jwtTokenService: JwtTokenService,
            enviromentConfig: EnvironmentConfigService,
            userRepository: DatabaseUserRepository,
            hashService: HashService
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                jwtTokenService,
                enviromentConfig,
                userRepository,
                hashService
              )
            )
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases())
        },
        {
          inject: [DatabaseEventRepository, ExceptionsService],
          provide: UsecasesProxyModule.EVENT_CREATE_PROXY,
          useFactory: (
            eventRepository: EventRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new CreateEventUseCases(eventRepository, exceptionService)
            )
        },
        {
          inject: [DatabaseEventRepository, ExceptionsService],
          provide: UsecasesProxyModule.EVENT_GET_PROXY,
          useFactory: (
            eventRepository: EventRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new GetEventUseCases(eventRepository, exceptionService)
            )
        }
      ],
      exports: [
        UsecasesProxyModule.REGISTER_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.EVENT_CREATE_PROXY,
        UsecasesProxyModule.EVENT_GET_PROXY
      ]
    }
  }
}
