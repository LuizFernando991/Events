import { IsNotEmpty, IsString } from 'class-validator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsString()
  inicialDate: string

  @IsNotEmpty()
  @IsString()
  finalDate: string
}
