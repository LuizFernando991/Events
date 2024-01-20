import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
  Post,
  Get,
  Query,
  Delete,
  Param,
  Put
} from '@nestjs/common'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { CreateEventUseCases } from 'src/usecases/events/create.usecase'
import { CreateEventDto, UpdateEventDto } from './event.dto'
import { JwtAuthGuard } from 'src/infrastructure/guards/jwtAuth.guard'
import { CurrentUser } from 'src/infrastructure/decorators/currentuser.decorator'
import { GetEventUseCases } from 'src/usecases/events/get.usecase'
import { DeleteEventUseCases } from 'src/usecases/events/delete.usecase'
import { UpdateEventUseCases } from 'src/usecases/events/update.usecase'
import { IJwtServicePayload } from 'src/domain/adapters/jwt.interface'
import { ParticipateEventUseCases } from 'src/usecases/events/participate.usecase'
import { CreateNotificationUseCases } from 'src/usecases/notification/create.usecases'

@Controller('event')
export class EventController {
  constructor(
    @Inject(UsecasesProxyModule.EVENT_CREATE_PROXY)
    private readonly CreateEventUseCases: UseCaseProxy<CreateEventUseCases>,
    @Inject(UsecasesProxyModule.EVENT_GET_PROXY)
    private readonly GetEventUseCases: UseCaseProxy<GetEventUseCases>,
    @Inject(UsecasesProxyModule.EVENT_DELETE_PROXY)
    private readonly DeleteEventUseCases: UseCaseProxy<DeleteEventUseCases>,
    @Inject(UsecasesProxyModule.EVENT_UPDATE_PROXY)
    private readonly UpdateEventUseCases: UseCaseProxy<UpdateEventUseCases>,
    @Inject(UsecasesProxyModule.EVENT_PARTICIPATE_PROXY)
    private readonly ParticipateEventUseCases: UseCaseProxy<ParticipateEventUseCases>,
    @Inject(UsecasesProxyModule.NOTIFICATION_CREATE_PROXY)
    private readonly notificationCreateUseCases: UseCaseProxy<CreateNotificationUseCases>
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() data: CreateEventDto,
    @CurrentUser() currentUser: IJwtServicePayload
  ) {
    const event = await this.CreateEventUseCases.getInstance().execute({
      ...data,
      inicialDate: data.inicialDate,
      finalDate: data.finalDate,
      creatorId: currentUser.id
    })

    return { event }
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() data: UpdateEventDto,
    @CurrentUser() currentUser: IJwtServicePayload,
    @Param('id') id: string
  ) {
    const newEvent = await this.UpdateEventUseCases.getInstance().execute(
      currentUser.id,
      id ? +id : undefined,
      data
    )
    this.notificationCreateUseCases.getInstance().execute({
      participants: newEvent.participants,
      title: `O evento: ${newEvent.name}. Foi alterado`,
      description: 'O evento que você estava participando foi alterado',
      type: 'updated'
    })

    return newEvent
  }

  @Put('/participate/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async participate(
    @CurrentUser() currentUser: IJwtServicePayload,
    @Param('id') id: string
  ) {
    const newEvent =
      await this.ParticipateEventUseCases.getInstance().participate(
        +id,
        currentUser.id
      )
    return newEvent
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page') page: string,
    @Query('search') search: string,
    @Query('inicialDate') inicialDate: string,
    @Query('finalDate') finalDate: string
  ) {
    const events = await this.GetEventUseCases.getInstance().getEvents({
      page: page ? +page : 1,
      search,
      inicialDate: inicialDate ? inicialDate : undefined,
      finalDate: finalDate ? finalDate : undefined
    })

    return events
  }

  @Get('/participations/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getParticipantions(@Param('id') id: string) {
    return this.GetEventUseCases.getInstance().getParticipations(+id)
  }

  @Get('/userevents')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findAllUserEvents(
    @CurrentUser() currentUser: IJwtServicePayload,
    @Query('page') page: string,
    @Query('search') search: string,
    @Query('inicialDate') inicialDate: string,
    @Query('finalDate') finalDate: string
  ) {
    const events = await this.GetEventUseCases.getInstance().getEvents({
      creatorId: currentUser.id,
      page: page ? +page : 1,
      search,
      inicialDate: inicialDate ? inicialDate : undefined,
      finalDate: finalDate ? finalDate : undefined
    })

    return events
  }

  @Get('/geteventsuserparticipates')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findAllUserEventsParticipations(
    @CurrentUser() currentUser: IJwtServicePayload,
    @Query('page') page: string,
    @Query('search') search: string,
    @Query('inicialDate') inicialDate: string,
    @Query('finalDate') finalDate: string
  ) {
    const events =
      await this.GetEventUseCases.getInstance().getEventsThatUserParticipates({
        userId: currentUser.id,
        page: page ? +page : 1,
        search,
        inicialDate: inicialDate ? inicialDate : undefined,
        finalDate: finalDate ? finalDate : undefined
      })

    return events
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getEvemt(
    @Param('id') id: string,
    @CurrentUser() currentUser: IJwtServicePayload
  ) {
    const events = await this.GetEventUseCases.getInstance().getEvent(
      +id,
      currentUser.id
    )

    return events
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async delete(
    @CurrentUser() currentUser: IJwtServicePayload,
    @Param('id') id: string
  ) {
    const deleteEvent = await this.DeleteEventUseCases.getInstance().execulte(
      currentUser.id,
      +id
    )
    this.notificationCreateUseCases.getInstance().execute({
      participants: deleteEvent.participants,
      title: `O evento: ${deleteEvent.name}. Foi cancelado`,
      description: 'O evento que você estava participando foi cancelado',
      type: 'canceled'
    })
    return
  }
}
