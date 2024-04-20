import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class LoginUserDto {
  @IsString()
  // @IsEmail()
  // @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly username?: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(6)
  readonly password: string;
}
