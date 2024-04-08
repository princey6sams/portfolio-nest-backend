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

  @IsString()
  imgName: string;

  @IsArray()
  comments: [
    {
      user_id: string;
      body: string;
      date: Date;
    },
  ];

  @IsObject()
  meta: {
    votes: number;
    favs: number;
  };
}
