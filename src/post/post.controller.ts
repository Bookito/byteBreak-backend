import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(): Promise<any[]> {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<any> {
    return this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Body() body: any): Promise<void> {
    return this.postService.createPost(body);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() body: any): Promise<void> {
    return this.postService.updatePost(id, body);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postService.deletePost(id);
  }
}
