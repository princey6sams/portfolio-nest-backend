import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  private: boolean;

  @Prop()
  imgName?: string;

  @Prop(
    raw([
      {
        user_id: { type: String },
        body: { type: String },
        date: { type: Date },
      },
    ]),
  )
  comments?: Array<Record<string, string | Date>>;

  @Prop(
    raw({
      votes: { type: Number },
      favs: { type: Number },
    }),
  )
  meta?: Record<string, number>;
}

export const PostSchema = SchemaFactory.createForClass(Post);
