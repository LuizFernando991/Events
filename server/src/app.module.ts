import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './infrastructure/db/prisma.module'
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module'
import { ControllersModule } from './infrastructure/controllers/controllers.module'
import { LocalStrategy } from './infrastructure/strategies/local.strategy'
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy'
import { JwtRefreshTokenStrategy } from './infrastructure/strategies/jwtRefresh.strategy'
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecase-proxy.module'
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UsecasesProxyModule.register(),
    ExceptionsModule,
    EnvironmentConfigModule,
    JwtServiceModule,
    ControllersModule
  ],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy]
})
export class AppModule {}
