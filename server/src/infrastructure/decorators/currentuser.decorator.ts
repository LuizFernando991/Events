import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { Request } from 'express'
import { IJwtServicePayload } from 'src/domain/adapters/jwt.interface'

export class AuthRequest extends Request {
  user: IJwtServicePayload
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IJwtServicePayload => {
    const request = context.switchToHttp().getRequest<AuthRequest>()

    return request.user
  }
)
