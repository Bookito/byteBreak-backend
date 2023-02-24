import { Controller, Post, Body } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { Blog } from './interfaces/blog.interface';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post()
  async crawlBlog(@Body() blog: Blog) {
    return this.crawlerService.crawlBlog(blog);
  }
}
