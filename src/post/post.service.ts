import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from 'dto/create-post.dto';
import { UpdatePostDto } from 'dto/update-post.dto';
import { IPost } from 'interfaces/post.interface';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<IPost>) {} // Change to postdocument

  async createPost(createPostDto: CreatePostDto): Promise<IPost> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async updatePost(
    postId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<IPost> {
    const existingPost = await this.postModel.findByIdAndUpdate(
      postId,
      updatePostDto,
      { new: true },
    );
    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    return existingPost;
  }

  async getAllPosts(): Promise<IPost[]> {
    const postData = await this.postModel.find();
    if (!postData || postData.length == 0) {
      throw new NotFoundException('Post data not found!');
    }
    return postData;
  }

  async getPostById(postId: string): Promise<IPost> {
    const postData = await this.postModel.findById(postId);
    if (!postData) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    return postData;
  }

  async getPost(postId: string): Promise<IPost> {
    const existingPost = await this.postModel.findById(postId).exec();
    if (!existingPost) {
      throw new NotFoundException(`Spost #${postId} not found`);
    }
    return existingPost;
  }
  async deletePost(postId: string): Promise<IPost> {
    const deletedPost = await this.postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new NotFoundException(`Spost #${postId} not found`);
    }
    return deletedPost;
  }
}

// add more api routes which are customized and more powerful aggregation pipeline queries
