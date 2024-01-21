import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
  Get
} from '@nestjs/common'
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy'
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module'
import { JwtAuthGuard } from 'src/infrastructure/guards/jwtAuth.guard'
import { CurrentUser } from 'src/infrastructure/decorators/currentuser.decorator'

import { IJwtServicePayload } from 'src/domain/adapters/jwt.interface'
import { GetUserUseCases } from 'src/usecases/user/get.usecases'

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.USER_GET_USECASES_PROXY)
    private readonly userGetUseCases: UseCaseProxy<GetUserUseCases>
  ) {}

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getParticipantions(@CurrentUser() user: IJwtServicePayload) {
    return this.userGetUseCases.getInstance().searchUsers(user.id)
  }
}
