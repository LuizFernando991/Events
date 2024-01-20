import { JwtService } from '@nestjs/jwt'
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { Notification } from 'src/domain/model/notification'
import { SocketEmitterInterface } from 'src/domain/socket/SocketEmitter'

const corsOptions = {
  origin: 'http://localhost:5173',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

@WebSocketGateway({
  cors: corsOptions
})
export class SocketGateway
  implements OnGatewayConnection, SocketEmitterInterface
{
  @WebSocketServer()
  private server: Socket

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(socket: Socket) {
    const cookies = socket.handshake.headers.cookie
    const refresh = cookies.split(';')[0].split('=')[1]
    const user = await this.jwtService.verify(refresh, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET
    })
    socket.join(`${user.id}`)
  }

  emitNotification(userId: number, data: Notification) {
    this.server.to(`${userId}`).emit('notification', data)
  }
}
