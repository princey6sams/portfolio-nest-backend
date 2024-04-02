import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'schema/post.schema';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/portfolio'),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
