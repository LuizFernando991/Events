import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  username: string

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string
}

export class ConfirmRegisterDto {
  @IsString()
  @IsNotEmpty()
  activationToken: string

  @IsString()
  @IsNotEmpty()
  activationCode: string
}
