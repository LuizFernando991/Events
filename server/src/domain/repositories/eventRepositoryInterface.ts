import { Event } from '../model/event'
import { GetEventOptionsType, RegisterEventType } from '../types/event.type'

export interface EventRepository {
  insert(user: RegisterEventType): Promise<Event>
  get(options: GetEventOptionsType): Promise<any>
}
