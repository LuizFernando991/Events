import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
  Post
} from '@nestjs/common'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { CreateEventUseCases } from 'src/usecases/events/create.usecase'
import { CreateEventDto } from './event.dto'
import { JwtAuthGuard } from 'src/infrastructure/guards/jwtAuth.guard'
import { CurrentUser } from 'src/infrastructure/decorators/currentuser.decorator'

@Controller('event')
export class EventController {
  constructor(
    @Inject(UsecasesProxyModule.EVENT_CREATE_PROXY)
    private readonly CreateEventUseCases: UseCaseProxy<CreateEventUseCases>
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CreateEventDto, @CurrentUser() currentUser) {
    return await this.CreateEventUseCases.getInstance().execute({
      ...data,
      inicialDate: new Date(data.inicialDate),
      finalDate: new Date(data.finalDate),
      creatorId: currentUser.id
    })
  }
}
