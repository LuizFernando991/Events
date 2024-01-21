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
import { DeleteEventUseCases } from 'src/usecases/events/delete.usecase'
import { UpdateEventUseCases } from 'src/usecases/events/update.usecase'
import { ParticipateEventUseCases } from 'src/usecases/events/participate.usecase'
import { CreateNotificationUseCases } from 'src/usecases/notification/create.usecases'
import { NotificationRepository } from 'src/domain/repositories/notificationRepositoryInterface'
import { SocketGateway } from '../socket/socket.gateway'
import { DatabaseNotificationRepository } from '../repositories/notification.repository'
import { SocketModule } from '../socket/socket.module.'
import { GetNotificationUseCases } from 'src/usecases/notification/get.usecases'
import { UpdateNotificationUseCases } from 'src/usecases/notification/update.usecases'
import { DatabaseInvitationRepository } from '../repositories/invitation.repository'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'
import { CreateInvitationUseCases } from 'src/usecases/invitation/create.usecase'
import { RespondInvitationUseCases } from 'src/usecases/invitation/respond.usecase'
import { GetUserUseCases } from 'src/usecases/user/get.usecases'
import { GetInvitationUseCases } from 'src/usecases/invitation/get.usecase'

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtModule,
    RepositoriesModule,
    EmailModule,
    HashModule,
    ExceptionsModule,
    SocketModule
  ]
})
export class UsecasesProxyModule {
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy'
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy'
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy'
  static EVENT_CREATE_PROXY = 'EventCreateUseCasesProxy'
  static EVENT_GET_PROXY = 'EventGetUseCasesProxy'
  static EVENT_DELETE_PROXY = 'EventDeleteUseCasesProxy'
  static EVENT_UPDATE_PROXY = 'EventUpdateUseCasesProxy'
  static EVENT_PARTICIPATE_PROXY = 'EventParticipateUseCasesProxy'
  static NOTIFICATION_CREATE_PROXY = 'NotificationCreateUseCasesProxy'
  static SOCKET_EMIT_PROXY = 'SocketEmitUseCasesProxy'
  static NOTIFICATION_GET_PROXY = 'NotificationGetUseCasesProxy'
  static NOTIFICATION_UPDATE_PROXY = 'NotificationUpdateUseCasesProxy'
  static INVITATION_CREATE_PROXY = 'InvitationCreateUseCasesProxy'
  static INVITATION_RESPOND_PROXY = 'InvitationRespondUseCasesProxy'
  static USER_GET_USECASES_PROXY = 'UserGetUseCasesProxy'
  static INVITATION_GET_PROXY = 'InvitationGetUseCasesProxy'

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.USER_GET_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUserUseCases(userRepository))
        },
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
        },
        {
          inject: [DatabaseEventRepository, ExceptionsService],
          provide: UsecasesProxyModule.EVENT_DELETE_PROXY,
          useFactory: (
            eventRepository: EventRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new DeleteEventUseCases(eventRepository, exceptionService)
            )
        },
        {
          inject: [DatabaseEventRepository, ExceptionsService],
          provide: UsecasesProxyModule.EVENT_UPDATE_PROXY,
          useFactory: (
            eventRepository: EventRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new UpdateEventUseCases(eventRepository, exceptionService)
            )
        },
        {
          inject: [
            DatabaseEventRepository,
            ExceptionsService,
            DatabaseInvitationRepository
          ],
          provide: UsecasesProxyModule.EVENT_PARTICIPATE_PROXY,
          useFactory: (
            eventRepository: EventRepository,
            exceptionService: ExceptionsService,
            invitationRepository: InvitationRepository
          ) =>
            new UseCaseProxy(
              new ParticipateEventUseCases(
                eventRepository,
                exceptionService,
                invitationRepository
              )
            )
        },
        {
          inject: [
            DatabaseNotificationRepository,
            ExceptionsService,
            SocketGateway
          ],
          provide: UsecasesProxyModule.NOTIFICATION_CREATE_PROXY,
          useFactory: (
            notificationRepository: NotificationRepository,
            exceptionService: ExceptionsService,
            socketService: SocketGateway
          ) =>
            new UseCaseProxy(
              new CreateNotificationUseCases(
                notificationRepository,
                exceptionService,
                socketService
              )
            )
        },
        {
          inject: [DatabaseNotificationRepository, ExceptionsService],
          provide: UsecasesProxyModule.NOTIFICATION_GET_PROXY,
          useFactory: (
            notificationRepository: NotificationRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new GetNotificationUseCases(
                notificationRepository,
                exceptionService
              )
            )
        },
        {
          inject: [DatabaseNotificationRepository, ExceptionsService],
          provide: UsecasesProxyModule.NOTIFICATION_UPDATE_PROXY,
          useFactory: (
            notificationRepository: NotificationRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new UpdateNotificationUseCases(
                notificationRepository,
                exceptionService
              )
            )
        },
        {
          inject: [
            DatabaseEventRepository,
            DatabaseInvitationRepository,
            SocketGateway,
            ExceptionsService
          ],
          provide: UsecasesProxyModule.INVITATION_CREATE_PROXY,
          useFactory: (
            eventRepository: EventRepository,
            invitationRepository: InvitationRepository,
            socketService: SocketGateway,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new CreateInvitationUseCases(
                eventRepository,
                invitationRepository,
                socketService,
                exceptionService
              )
            )
        },
        {
          inject: [
            DatabaseEventRepository,
            DatabaseInvitationRepository,
            ExceptionsService
          ],
          provide: UsecasesProxyModule.INVITATION_RESPOND_PROXY,
          useFactory: (
            eventRepository: EventRepository,
            invitationRepository: InvitationRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new RespondInvitationUseCases(
                eventRepository,
                invitationRepository,
                exceptionService
              )
            )
        },
        {
          inject: [DatabaseInvitationRepository, ExceptionsService],
          provide: UsecasesProxyModule.INVITATION_GET_PROXY,
          useFactory: (
            invitationRepository: InvitationRepository,
            exceptionService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new GetInvitationUseCases(invitationRepository, exceptionService)
            )
        }
      ],
      exports: [
        UsecasesProxyModule.REGISTER_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.EVENT_CREATE_PROXY,
        UsecasesProxyModule.EVENT_GET_PROXY,
        UsecasesProxyModule.EVENT_DELETE_PROXY,
        UsecasesProxyModule.EVENT_UPDATE_PROXY,
        UsecasesProxyModule.EVENT_PARTICIPATE_PROXY,
        UsecasesProxyModule.NOTIFICATION_CREATE_PROXY,
        UsecasesProxyModule.NOTIFICATION_GET_PROXY,
        UsecasesProxyModule.NOTIFICATION_UPDATE_PROXY,
        UsecasesProxyModule.INVITATION_CREATE_PROXY,
        UsecasesProxyModule.USER_GET_USECASES_PROXY,
        UsecasesProxyModule.INVITATION_GET_PROXY,
        UsecasesProxyModule.INVITATION_RESPOND_PROXY
      ]
    }
  }
}
