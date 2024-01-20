import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { Event } from 'src/domain/model/event'
import {
  GetEventOptionsType,
  GetEventResType,
  GetEventsResType,
  GetEventsThatUserParticipatesType,
  RegisterEventType,
  UpdateEventType
} from 'src/domain/types/event.type'
import { Prisma } from '@prisma/client'

@Injectable()
export class DatabaseEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insert(eventData: RegisterEventType): Promise<Event> {
    const newEvent = await this.prisma.event.create({
      data: {
        ...eventData,
        inicialDate: new Date(
          new Date(eventData.inicialDate).setHours(0, 0, 0, 0)
        ),
        finalDate: new Date(new Date(eventData.finalDate).setHours(0, 0, 0, 0)),
        participants: { connect: [{ id: eventData.creatorId }] }
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
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return newEvent
  }

  async getEvent(id: number, userId: number): Promise<GetEventResType> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        inicialDate: true,
        finalDate: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        participants: {
          where: {
            id: userId
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    const formattedEvent = {
      ...event,
      userIsParticipates: !!event.participants.length
    }

    return formattedEvent
  }

  async get(options: GetEventOptionsType): Promise<GetEventsResType> {
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

    if (options.inicialDate && options.finalDate) {
      where = {
        ...where,
        AND: [
          { finalDate: { gte: new Date(options.inicialDate) } },
          { inicialDate: { lte: new Date(options.finalDate) } }
        ]
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
            id: true,
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
  ): Promise<GetEventsResType> {
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

    if (options.inicialDate && options.finalDate) {
      where = {
        ...where,
        AND: [
          { finalDate: { gte: new Date(options.inicialDate) } },
          { inicialDate: { lte: new Date(options.finalDate) } }
        ]
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
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return { events, currentPage: options.page, pages: totalPages }
  }

  async update(id: number, data: UpdateEventType): Promise<Event> {
    const newEvent = await this.prisma.event.update({
      where: {
        id
      },
      data: {
        ...data,
        finalDate: data.finalDate
          ? new Date(new Date(data.finalDate).setHours(0, 0, 0, 0))
          : undefined,
        inicialDate: data.inicialDate
          ? new Date(new Date(data.inicialDate).setHours(0, 0, 0, 0))
          : undefined
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
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return newEvent
  }

  async delete(id: number): Promise<void> {
    await this.prisma.event.delete({
      where: {
        id
      }
    })
  }
}
