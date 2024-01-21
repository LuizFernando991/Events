import {
  InvitationRes,
  RegisterInvitationType
} from '../types/invitation.types'

export interface InvitationRepository {
  getUserInvitations(userId: number): Promise<InvitationRes[]>
  create(data: RegisterInvitationType): Promise<InvitationRes>
  respondInvitation(invitationId: number, accept: boolean): Promise<void>
  getInvitation(invitationId: number): Promise<InvitationRes>
}
