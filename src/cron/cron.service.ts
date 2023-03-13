import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async handleGoogleBlogCron() {
    try {
      await this.googleBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Google Blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Google Error: ${err.message}`, '', 'CronService');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_7PM)
  async handleAwsBlogCron() {
    try {
      await this.awsBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled AWS Blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job AWS Error: ${err.message}`, '', 'CronService');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_8PM)
  async handleMicrosoftBlogCron() {
    try {
      await this.microsoftBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Microsoft Blog', 'CronService');
    } catch (err) {
      Logger.error(
        `Cron Job Microsoft Error: ${err.message}`,
        '',
        'CronService',
      );
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9PM)
  async handleMetaBlogCron() {
    try {
      await this.metaBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Meta Blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Meta Error: ${err.message}`, '', 'CronService');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async handleTwitterBlogCron() {
    try {
      await this.twitterBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Twitter Blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Twitter Error: ${err.message}`, '', 'CronService');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async handleUberBlogCron() {
    try {
      await this.uberBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled Uber blog', 'CronService');
    } catch (err) {
      Logger.error(`Cron Job Uber Error: ${err.message}`, '', 'CronService');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleLinkedInBlogCron() {
    try {
      await this.linkedInBlogCrawler.crawl();
      Logger.log('Cron Job: Crawled LinkedIn blog', 'CronService');
    } catch (err) {
      Logger.error(
        `Cron Job LinkedIn Error: ${err.message}`,
        '',
        'CronService',
      );
    }
  }
}
