import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
  Get,
  Put
} from '@nestjs/common'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { JwtAuthGuard } from 'src/infrastructure/guards/jwtAuth.guard'
import { CurrentUser } from 'src/infrastructure/decorators/currentuser.decorator'

import { IJwtServicePayload } from 'src/domain/adapters/jwt.interface'
import { GetNotificationUseCases } from 'src/usecases/notification/get.usecases'
import { UpdateNotificationUseCases } from 'src/usecases/notification/update.usecases'

@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(UsecasesProxyModule.NOTIFICATION_GET_PROXY)
    private readonly notificationGetUseCases: UseCaseProxy<GetNotificationUseCases>,
    @Inject(UsecasesProxyModule.NOTIFICATION_UPDATE_PROXY)
    private readonly notificationUpdateUseCases: UseCaseProxy<UpdateNotificationUseCases>
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getParticipantions(@CurrentUser() user: IJwtServicePayload) {
    return this.notificationGetUseCases.getInstance().execute(user.id)
  }

  @Put('/viewed')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async participate(@CurrentUser() currentUser: IJwtServicePayload) {
    this.notificationUpdateUseCases.getInstance().setViewed(currentUser.id)
  }
}
