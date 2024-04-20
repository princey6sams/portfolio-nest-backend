import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    unique: [true, 'Email already exists'],
  })
  email: string;
  @Prop()
  name: string;
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
