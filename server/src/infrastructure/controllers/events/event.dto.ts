import { IsNotEmpty, IsString } from 'class-validator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  inicialDate: Date

  @IsNotEmpty()
  finalDate: Date
}
