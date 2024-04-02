import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  private: boolean;

  @IsArray()
  @IsNotEmpty()
  comments: [
    {
      user_id: string;
      body: string;
      date: Date;
    },
  ];

  @IsObject()
  @IsNotEmpty()
  meta: {
    votes: number;
    favs: number;
  };
}
