import { Controller, Get } from '@nestjs/common';
import { CacheTTL } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @CacheTTL(86400) // 캐시 유효기간을 1일로 설정
  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    return { posts };
  }
}
