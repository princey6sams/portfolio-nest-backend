import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsMongoId,
  MinLength,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateUserDto {
  @IsMongoId()
  readonly _id: ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  //   @IsOptional()
  //   @IsNumber()
  //   age: number;

  //   @IsOptional()
  //   @IsArray()
  //   posts: string[];
}
