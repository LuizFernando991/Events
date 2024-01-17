import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { UserRepository } from 'src/domain/repositories/userRepositoryIInterface'
import { UserM } from 'src/domain/model/user'
import { RegisterUserType } from 'src/domain/types/user.types'

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUserByEmail(email: string): Promise<UserM> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      return null
    }
    return user
  }

  async getUserById(id: number): Promise<UserM> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!user) {
      return null
    }
    return user
  }

  async insert(userData: RegisterUserType): Promise<UserM> {
    const newUser = await this.prisma.user.create({
      data: userData
    })

    return newUser
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        hashRefreshToken: refreshToken
      }
    })
  }

  async getExistsUser(email: string, username: string): Promise<UserM> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email
          },
          { username }
        ]
      }
    })
    if (!user) {
      return null
    }
    return user
  }
}
