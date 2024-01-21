import { IsNotEmpty, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

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

  @IsNotEmpty()
  @IsString()
  finalTime: string

  @IsNotEmpty()
  @IsString()
  inicialTime: string
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
