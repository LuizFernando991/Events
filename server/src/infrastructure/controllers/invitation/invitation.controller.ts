import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
  Get,
  Body,
  Post,
  Put
} from '@nestjs/common'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { JwtAuthGuard } from 'src/infrastructure/guards/jwtAuth.guard'
import { CurrentUser } from 'src/infrastructure/decorators/currentuser.decorator'

import { IJwtServicePayload } from 'src/domain/adapters/jwt.interface'
import { CreateInvitationUseCases } from 'src/usecases/invitation/create.usecase'
import { CreateInvitationDto, RespondInvitationDto } from './invitation.dto'
import { GetInvitationUseCases } from 'src/usecases/invitation/get.usecase'
import { RespondInvitationUseCases } from 'src/usecases/invitation/respond.usecase'

@Controller('invitation')
export class InvitationController {
  constructor(
    @Inject(UsecasesProxyModule.INVITATION_CREATE_PROXY)
    private readonly invitationCreateUseCase: UseCaseProxy<CreateInvitationUseCases>,
    @Inject(UsecasesProxyModule.INVITATION_GET_PROXY)
    private readonly invitationGetUseCase: UseCaseProxy<GetInvitationUseCases>,
    @Inject(UsecasesProxyModule.INVITATION_RESPOND_PROXY)
    private readonly invitationRespondUseCase: UseCaseProxy<RespondInvitationUseCases>
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() data: CreateInvitationDto,
    @CurrentUser() user: IJwtServicePayload
  ) {
    this.invitationCreateUseCase
      .getInstance()
      .create(user.id, data.ids, data.eventId)
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getInvites(@CurrentUser() user: IJwtServicePayload) {
    return this.invitationGetUseCase.getInstance().getUserInvitations(user.id)
  }

  @Put('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async respondInvitation(
    @Body() data: RespondInvitationDto,
    @CurrentUser() user: IJwtServicePayload
  ) {
    return this.invitationRespondUseCase
      .getInstance()
      .respond(user.id, data.invitationId, !!data.accept)
  }
}
