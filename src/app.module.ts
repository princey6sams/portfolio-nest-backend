import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'schema/post.schema';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { HashService } from './hash/hash.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/portfolio'), // Replace this with actual MongoDB connection string later on, maybe use env file
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService, HashService],
})
export class AppModule {}
