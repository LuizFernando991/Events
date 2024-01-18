import { Event } from '../model/event'
import { RegisterEventType } from '../types/event.type'

export interface EventRepository {
  insert(user: RegisterEventType): Promise<Event>
}
