import { Document } from 'mongoose';
export interface IPost extends Document {
  title: string;
  description: string;
  content: string;
  private: boolean;
  comments: [{ user_id: string; body: string; date: Date }];
  meta: {
    votes: number;
    favs: number;
  };
}
