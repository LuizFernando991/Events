import { IEnviromentConfig } from 'src/domain/config/enviroment.interface'
import {
  IJwtService,
  IJwtServicePayload
} from '../../domain/adapters/jwt.interface'
import { IHashService } from 'src/domain/adapters/hash.interface'
import { UserRepository } from 'src/domain/repositories/userRepositoryIInterface'
import { removeObjectKey } from 'src/helpers/removeKey.helper'
import { UserWithoutPassword } from 'src/domain/model/user'

export class LoginUseCases {
  constructor(
    private readonly jwtTokenService: IJwtService,
    private readonly enviromentConfig: IEnviromentConfig,
    private readonly userRepository: UserRepository,
    private readonly hashService: IHashService
  ) {}

  async getCookieWithJwtToken(id: number, username: string) {
    const payload: IJwtServicePayload = { id, username }
    const secret = this.enviromentConfig.getJwtSecret()
    const expiresIn = this.enviromentConfig.getJwtExpirationTime()
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.enviromentConfig.getJwtExpirationTime()}`
  }

  async getCookieWithJwtRefreshToken(id: number, username: string) {
    const payload: IJwtServicePayload = { id, username }
    const secret = this.enviromentConfig.getJwtRefreshSecret()
    const expiresIn = this.enviromentConfig.getJwtRefreshExpirationTime()
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn)
    await this.setCurrentRefreshToken(token, id)
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.enviromentConfig.getJwtRefreshExpirationTime()}`
    return cookie
  }

  async validateUserForLocalStragtegy(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email)
    if (!user) {
      return null
    }
    const match = await this.hashService.compare(password, user.password)
    if (user && match) {
      const safeUser: UserWithoutPassword = removeObjectKey(user, 'password')
      return safeUser
    }
    return null
  }

  async validateUserForJWTStragtegy(email: string) {
    const user = await this.userRepository.getUserByEmail(email)
    if (!user) {
      return null
    }
    return user
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await this.hashService.hash(refreshToken)
    await this.userRepository.updateRefreshToken(
      userId,
      currentHashedRefreshToken
    )
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.userRepository.getUserByEmail(email)
    if (!user || !user.hashRefreshToken) {
      return null
    }

    const isRefreshTokenMatching = await this.hashService.compare(
      refreshToken,
      user.hashRefreshToken
    )
    if (isRefreshTokenMatching) {
      let safeUser = removeObjectKey(user, 'password')
      if (user.hashRefreshToken) {
        safeUser = removeObjectKey(safeUser, 'hashRefreshToken')
      }
      return { user: safeUser }
    }

    return null
  }
}
