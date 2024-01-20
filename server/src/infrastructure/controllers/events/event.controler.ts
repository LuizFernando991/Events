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
  Param
} from '@nestjs/common'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { CreateEventUseCases } from 'src/usecases/events/create.usecase'
import { CreateEventDto } from './event.dto'
import { JwtAuthGuard } from 'src/infrastructure/guards/jwtAuth.guard'
import { CurrentUser } from 'src/infrastructure/decorators/currentuser.decorator'
import { GetEventUseCases } from 'src/usecases/events/get.usecase'
import { DeleteEventUseCases } from 'src/usecases/events/delete.usecase'

@Controller('event')
export class EventController {
  constructor(
    @Inject(UsecasesProxyModule.EVENT_CREATE_PROXY)
    private readonly CreateEventUseCases: UseCaseProxy<CreateEventUseCases>,
    @Inject(UsecasesProxyModule.EVENT_GET_PROXY)
    private readonly GetEventUseCases: UseCaseProxy<GetEventUseCases>,
    @Inject(UsecasesProxyModule.EVENT_DELETE_PROXY)
    private readonly DeleteEventUseCases: UseCaseProxy<DeleteEventUseCases>
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CreateEventDto, @CurrentUser() currentUser) {
    const event = await this.CreateEventUseCases.getInstance().execute({
      ...data,
      inicialDate: data.inicialDate,
      finalDate: data.finalDate,
      creatorId: currentUser.id
    })

    return { event }
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

  @Get('/userevents')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findAllUserEvents(
    @CurrentUser() currentUser,
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
    @CurrentUser() currentUser,
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
  async getEvemt(@Param('id') id: string) {
    const events = await this.GetEventUseCases.getInstance().getEvent(+id)

    return events
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async delete(@CurrentUser() currentUser, @Param('id') id: string) {
    await this.DeleteEventUseCases.getInstance().execulte(currentUser.id, +id)
    return
  }
}
