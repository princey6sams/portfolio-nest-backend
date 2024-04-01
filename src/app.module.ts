import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'schema/post.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/portfolio'),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
