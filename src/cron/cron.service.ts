import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GoogleBlogCrawler } from 'src/crawlers/googleBlogCrawler';

@Injectable()
export class CronService {
  constructor(private readonly googleBlogCrawler: GoogleBlogCrawler) {}

  @Cron('30 6 * * *') // Runs every hour on the hour
  async handleCron() {
    try {
      await this.googleBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Google Blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Error: ${err.message}`, '', 'CronService');
    }
  }
}
