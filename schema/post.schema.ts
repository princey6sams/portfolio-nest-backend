import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  private: boolean;

  @Prop()
  comments: [
    {
      user_id: string;
      body: string;
      date: Date;
    },
  ];

  @Prop()
  meta: {
    votes: number;
    favs: number;
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);
