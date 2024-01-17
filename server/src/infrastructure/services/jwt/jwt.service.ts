import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
  IJwtService,
  IJwtServiceActivationTokenPayload,
  IJwtServicePayload
} from '../../../domain/adapters/jwt.interface'

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string, secret: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, { secret })
    } catch {
      return null
    }
  }

  async checkActiovationToken(
    token: string,
    secret: string
  ): Promise<IJwtServiceActivationTokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token, { secret })
    } catch {
      return null
    }
  }

  createActivationToken(
    payload: IJwtServiceActivationTokenPayload,
    secret: string,
    expiresIn: string
  ): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn
    })
  }

  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn
    })
  }
}
