import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GoogleBlogCrawler } from 'src/crawlers/googleBlogCrawler';
import { AwsBlogCrawler } from 'src/crawlers/awsBlogCrawler';
import { MicrosoftBlogCrawler } from 'src/crawlers/microsoftBlogCrawler';
import { MetaBlogCrawler } from '../crawlers/metaBlogCrawler';
import { TwitterBlogCrawler } from '../crawlers/twitterBlogCrawler';

@Injectable()
export class CronService {
  constructor(
    private readonly googleBlogCrawler: GoogleBlogCrawler,
    private readonly awsBlogCrawler: AwsBlogCrawler,
    private readonly microsoftBlogCrawler: MicrosoftBlogCrawler,
    private readonly metaBlogCrawler: MetaBlogCrawler,
    private readonly twitterBlogCrawler: TwitterBlogCrawler,
  ) {}

  @Cron('30 6 * * *') // Runs every day at 6:30 AM
  async handleCron() {
    try {
      await this.googleBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Google Blog', 'CronService');

      await this.awsBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled AWS Blog', 'CronService');

      await this.microsoftBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Microsoft Blog', 'CronService');

      await this.metaBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Meta Blog', 'CronService');

      await this.twitterBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Twitter Blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Error: ${err.message}`, '', 'CronService');
    }
  }
}
