import { Event } from '../model/event'
import {
  GetEventOptionsType,
  GetEventResType,
  GetEventsResType,
  GetEventsThatUserParticipatesType,
  RegisterEventType,
  UpdateEventType
} from '../types/event.type'
import { ParticipationType } from '../types/participation'

export interface EventRepository {
  insert(user: RegisterEventType): Promise<Event>
  getEvent(id: number, userId: number): Promise<GetEventResType>
  delete(id: number): Promise<Event>
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
  getParticipantions(id: number): Promise<ParticipationType[]>
}
