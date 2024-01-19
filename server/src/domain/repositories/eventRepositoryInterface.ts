import { Event } from '../model/event'
import {
  GetEventOptionsType,
  GetEventsThatUserParticipatesResType,
  GetEventsThatUserParticipatesType,
  RegisterEventType
} from '../types/event.type'

export interface EventRepository {
  insert(user: RegisterEventType): Promise<Event>
  getEvent(id: number): Promise<Event>
  delete(id: number): Promise<void>
  get(
    options: GetEventOptionsType
  ): Promise<GetEventsThatUserParticipatesResType>
  getEventsThatUserParticipates(
    options: GetEventsThatUserParticipatesType
  ): Promise<GetEventsThatUserParticipatesResType>
}
