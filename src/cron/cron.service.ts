import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GoogleBlogCrawler } from 'src/crawlers/googleBlogCrawler';
import { AwsBlogCrawler } from 'src/crawlers/awsBlogCrawler';

@Injectable()
export class CronService {
  constructor(
    private readonly googleBlogCrawler: GoogleBlogCrawler,
    private readonly awsBlogCrawler: AwsBlogCrawler,
  ) {}

  @Cron('30 6 * * *') // Runs every day at 6:30 AM
  async handleCron() {
    try {
      await this.googleBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Google Blog', 'CronService');

      await this.awsBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled AWS Blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Error: ${err.message}`, '', 'CronService');
    }
  }
}
