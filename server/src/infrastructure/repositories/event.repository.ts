import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { EventRepository } from 'src/domain/repositories/eventRepositoryInterface'
import { Event } from 'src/domain/model/event'
import { RegisterEventType } from 'src/domain/types/event.type'

@Injectable()
export class DatabaseEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insert(eventData: RegisterEventType): Promise<Event> {
    const newEvent = await this.prisma.event.create({
      data: eventData
    })

    return newEvent
  }
}
