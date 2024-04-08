import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  //   @IsEmail()
  //   email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  //   @IsOptional()
  //   @IsNumber()
  //   age: number;

  //   @IsOptional()
  //   @IsArray()
  //   posts: string[];
}
