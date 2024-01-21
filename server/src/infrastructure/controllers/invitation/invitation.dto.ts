import { IsInt, ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

export class CreateInvitationDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'empty array' })
  @IsInt({
    each: true,
    message: 'Each element must by a int'
  })
  ids: number[]

  @IsInt()
  @IsNotEmpty()
  eventId: number
}

export class RespondInvitationDto {
  @IsInt()
  @IsNotEmpty()
  invitationId: number
}
