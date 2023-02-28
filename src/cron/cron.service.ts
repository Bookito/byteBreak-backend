import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GoogleBlogCrawler } from 'src/crawlers/googleBlogCrawler';
import { AwsBlogCrawler } from 'src/crawlers/awsBlogCrawler';
import { MicrosoftBlogCrawler } from 'src/crawlers/microsoftBlogCrawler';
import { MetaBlogCrawler } from '../crawlers/metaBlogCrawler';
import { TwitterBlogCrawler } from '../crawlers/twitterBlogCrawler';
import { UberBlogCrawler } from '../crawlers/uberBlogCrawler';
import { LinkedInBlogCrawler } from '../crawlers/linkedInBlogCrawler';

@Injectable()
export class CronService {
  constructor(
    private readonly googleBlogCrawler: GoogleBlogCrawler,
    private readonly awsBlogCrawler: AwsBlogCrawler,
    private readonly microsoftBlogCrawler: MicrosoftBlogCrawler,
    private readonly metaBlogCrawler: MetaBlogCrawler,
    private readonly twitterBlogCrawler: TwitterBlogCrawler,
    private readonly uberBlogCrawler: UberBlogCrawler,
    private readonly linkedInBlogCrawler: LinkedInBlogCrawler,
  ) {}

  @Cron('30 6 * * *') // Runs every day at 6:30 AM
  async handleCron() {
    try {
      await Promise.all([
        this.googleBlogCrawler.crawl(),
        this.awsBlogCrawler.crawl(),
        this.microsoftBlogCrawler.crawl(),
        this.metaBlogCrawler.crawl(),
        this.twitterBlogCrawler.crawl(),
        this.uberBlogCrawler.crawl(),
        this.linkedInBlogCrawler.crawl(),
      ]);
      Logger.log('Cron Job: Crawled all blogs', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Error: ${err.message}`, '', 'CronService');
    }
  }
}
