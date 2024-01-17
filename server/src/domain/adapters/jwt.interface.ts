import { RegisterUserType } from '../types/user.types'

export interface IJwtServicePayload {
  id: number
}

export interface IJwtServiceActivationTokenPayload {
  user: RegisterUserType
  code: string
}

export interface IJwtService {
  checkToken(token: string, secret: string): Promise<IJwtServicePayload>
  checkActiovationToken(
    token: string,
    secret: string
  ): Promise<IJwtServiceActivationTokenPayload>
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): string
  createActivationToken(
    payload: IJwtServiceActivationTokenPayload,
    secret: string,
    expiresIn: string
  ): string
}
