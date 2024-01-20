import { Module } from '@nestjs/common'
import { SocketGateway } from './socket.gateway'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [],
  providers: [SocketGateway, JwtService],
  exports: [SocketGateway]
})
export class SocketModule {}
