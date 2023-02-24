import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':postOwner')
  create(
    @Param('postOwner') postOwner: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(postOwner, createPostDto);
  }

  @Get(':postOwner')
  findAll(@Param('postOwner') postOwner: string) {
    return this.postsService.findAll(postOwner);
  }

  @Get(':postOwner/:postId')
  findOne(
    @Param('postOwner') postOwner: string,
    @Param('postId') postId: string,
  ) {
    return this.postsService.findOne(postOwner, postId);
  }

  @Put(':postOwner/:postId')
  update(
    @Param('postOwner') postOwner: string,
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(postOwner, postId, updatePostDto);
  }

  @Delete(':postOwner/:postId')
  remove(
    @Param('postOwner') postOwner: string,
    @Param('postId') postId: string,
  ) {
    return this.postsService.remove(postOwner, postId);
  }
}
