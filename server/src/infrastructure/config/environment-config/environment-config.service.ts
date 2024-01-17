import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnviromentConfig } from 'src/domain/config/enviroment.interface'

@Injectable()
export class EnvironmentConfigService implements EnviromentConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME')
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
  }
}
