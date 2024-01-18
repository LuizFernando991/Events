import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { Event } from 'src/domain/model/event'
import {
  GetEventOptionsType,
  GetEventsThatUserParticipatesResType,
  GetEventsThatUserParticipatesType,
  RegisterEventType
} from 'src/domain/types/event.type'
import { Prisma } from '@prisma/client'

@Injectable()
export class DatabaseEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insert(eventData: RegisterEventType): Promise<Event> {
    const newEvent = await this.prisma.event.create({
      data: eventData,
      select: {
        id: true,
        inicialDate: true,
        finalDate: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        creator: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    return newEvent
  }

  async get(
    options: GetEventOptionsType
  ): Promise<GetEventsThatUserParticipatesResType> {
    const limit = 20
    const skip = (options.page - 1) * limit

    let where: Prisma.EventWhereInput = {
      creatorId: options.creatorId
    }

    if (options.search) {
      where = {
        ...where,
        name: { contains: options.search, mode: 'insensitive' }
      }
    }

    if (options.inicialDate) {
      where = {
        ...where,
        inicialDate: { gte: options.inicialDate }
      }
    }

    if (options.finalDate) {
      where = {
        ...where,
        finalDate: { lte: options.finalDate }
      }
    }

    const totalEvents = await this.prisma.event.count({ where })

    const totalPages = Math.ceil(totalEvents / limit)

    const events = await this.prisma.event.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        inicialDate: 'desc'
      },
      select: {
        id: true,
        inicialDate: true,
        finalDate: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        creator: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    return {
      events: events,
      pages: totalPages,
      currentPage: options.page
    }
  }

  async getEventsThatUserParticipates(
    options: GetEventsThatUserParticipatesType
  ): Promise<GetEventsThatUserParticipatesResType> {
    const limit = 20
    const skip = (options.page - 1) * limit

    let where: Prisma.EventWhereInput = {
      participants: { some: { id: options.userId } }
    }

    if (options.search) {
      where = {
        ...where,
        name: { contains: options.search, mode: 'insensitive' }
      }
    }

    if (options.inicialDate) {
      where = {
        ...where,
        inicialDate: { gte: options.inicialDate }
      }
    }

    if (options.finalDate) {
      where = {
        ...where,
        finalDate: { lte: options.finalDate }
      }
    }
    const totalEvents = await this.prisma.event.count({ where })
    const totalPages = Math.ceil(totalEvents / limit)

    const events = await this.prisma.event.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        inicialDate: 'desc'
      },
      select: {
        id: true,
        inicialDate: true,
        finalDate: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        creator: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    return { events, currentPage: options.page, pages: totalPages }
  }
}
