import { Event } from '../model/event'
import {
  GetEventOptionsType,
  GetEventsThetUserParticipatesType,
  RegisterEventType
} from '../types/event.type'

export interface EventRepository {
  insert(user: RegisterEventType): Promise<Event>
  get(options: GetEventOptionsType): Promise<Event[]>
  getEventsThatUserParticipates(
    options: GetEventsThetUserParticipatesType
  ): Promise<Event[]>
}
