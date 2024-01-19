import { Event } from '../model/event'
import {
  GetEventOptionsType,
  GetEventsResType,
  GetEventsThatUserParticipatesType,
  RegisterEventType
} from '../types/event.type'

export interface EventRepository {
  insert(user: RegisterEventType): Promise<Event>
  getEvent(id: number): Promise<Event>
  delete(id: number): Promise<void>
  get(options: GetEventOptionsType): Promise<GetEventsResType>
  getEventsThatUserParticipates(
    options: GetEventsThatUserParticipatesType
  ): Promise<GetEventsResType>
}
