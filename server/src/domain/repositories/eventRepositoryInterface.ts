import { Event } from '../model/event'
import {
  GetEventOptionsType,
  GetEventResType,
  GetEventsResType,
  GetEventsThatUserParticipatesType,
  RegisterEventType,
  UpdateEventType
} from '../types/event.type'

export interface EventRepository {
  insert(user: RegisterEventType): Promise<Event>
  getEvent(id: number, userId: number): Promise<GetEventResType>
  delete(id: number): Promise<void>
  get(options: GetEventOptionsType): Promise<GetEventsResType>
  update(id: number, data: UpdateEventType): Promise<Event>
  getEventsThatUserParticipates(
    options: GetEventsThatUserParticipatesType
  ): Promise<GetEventsResType>
  participateEvent(
    id: number,
    userId: number,
    userAreadyParticipate: boolean
  ): Promise<GetEventResType>
}
