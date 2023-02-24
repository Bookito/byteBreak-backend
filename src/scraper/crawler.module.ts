import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { BlogRepository } from './repositories/blog.repository';
import { Scraper } from './scrapers/scraper';
import { TechCrunchScraper } from './scrapers/techcrunch.scraper';
import { VentureBeatScraper } from './scrapers/venturebeat.scraper';

@Module({
  controllers: [CrawlerController],
  providers: [
    CrawlerService,
    BlogRepository,
    { provide: 'Scraper', useClass: TechCrunchScraper },
    { provide: 'Scraper', useClass: VentureBeatScraper },
  ],
})
export class CrawlerModule {}
