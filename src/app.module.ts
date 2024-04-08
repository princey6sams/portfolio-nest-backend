import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'schema/post.schema';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/portfolio'), // Replace this with actual MongoDB connection string later on, maybe use env file
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
