import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entity/entity';

@Controller('posts')
export class BlogController {
  constructor(private readonly postService: BlogService) {}

  @Get()
  findAll(): Blog[] {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Blog {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() post: Blog): Blog {
    return this.postService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() blog: Blog): Blog {
    return this.postService.update(id, blog);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.postService.delete(id);
  }
}
