import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawl')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get()
  async crawl(): Promise<string> {
    await this.crawlerService.crawlPosts();
    return 'Crawling completed!';
  }
}
