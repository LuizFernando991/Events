import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { InvitationRepository } from 'src/domain/repositories/invitationRepositoryInterface'
import {
  InvitationRes,
  RegisterInvitationType
} from 'src/domain/types/invitation.types'

@Injectable()
export class DatabaseInvitationRepository implements InvitationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RegisterInvitationType): Promise<InvitationRes> {
    const invite = await this.prisma.invitation.create({
      data,
      select: {
        id: true,
        status: true,
        eventId: true,
        toUserId: true,
        fromUserId: true,
        fromUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        toUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return invite
  }

  async getUserInvitations(userId: number): Promise<InvitationRes[]> {
    const invites = await this.prisma.invitation.findMany({
      where: {
        toUserId: userId,
        status: 'opening'
      },
      select: {
        id: true,
        status: true,
        eventId: true,
        toUserId: true,
        fromUserId: true,
        fromUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        toUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return invites
  }

  async getInvitation(invitationId: number): Promise<InvitationRes> {
    const invitation = await this.prisma.invitation.findUnique({
      where: {
        id: invitationId
      },
      select: {
        id: true,
        status: true,
        eventId: true,
        toUserId: true,
        fromUserId: true,
        fromUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        toUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return invitation
  }

  async respondInvitation(
    invitationId: number,
    accept: boolean
  ): Promise<void> {
    await this.prisma.invitation.update({
      where: {
        id: invitationId
      },
      data: {
        status: accept ? 'accept' : 'rejected'
      }
    })
    return
  }
}
