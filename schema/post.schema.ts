import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  private: boolean;

  @Prop([
    {
      user_id: { type: String },
      body: { type: String },
      date: { type: Date },
    },
  ])
  comments: Array<{
    user_id: string;
    body: string;
    date: Date;
  }>;

  @Prop({
    votes: { type: Number },
    favs: { type: Number },
  })
  meta: {
    votes: number;
    favs: number;
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);
