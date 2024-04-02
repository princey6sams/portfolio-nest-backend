import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreatePostDto } from '../../dto/create-post.dto';
import { UpdatePostDto } from '../../dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Res() response, @Body() createPostDto: CreatePostDto) {
    try {
      const newPost = await this.postService.createPost(createPostDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Post has been created successfully',
        newPost,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Post not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:postId')
  async updatePost(
    @Res() response,
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      const updatedPost = await this.postService.updatePost(
        postId,
        updatePostDto,
      );
      if (!updatedPost) {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Post not found',
        });
      }
      return response.status(HttpStatus.OK).json({
        message: 'Post has been successfully updated',
        updatedPost,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Post not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getAllPosts(@Res() response) {
    try {
      const posts = await this.postService.getAllPosts();
      return response.status(HttpStatus.OK).json(posts);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Posts not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:postId')
  async getPostById(@Res() response, @Param('postId') postId: string) {
    try {
      const post = await this.postService.getPostById(postId);
      return response.status(HttpStatus.OK).json(post);
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'Post not found',
      });
    }
  }

  @Delete('/:postId')
  async deletePost(@Res() response, @Param('postId') postId: string) {
    try {
      const deletedPost = await this.postService.deletePost(postId);
      if (!deletedPost) {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Post not found',
        });
      }
      return response.status(HttpStatus.OK).json({
        message: 'Post has been deleted',
        deletedPost,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Post not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
