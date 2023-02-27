import { Module, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '../posts/posts.module';
import { GoogleBlogCrawler } from '../crawler/blogs/googleBlogCrawler';
import { CronService } from '../cron/cron.service';
import { DynamoDBModule } from '../dynamodb/dynamodb.module';
import { DynamoDBService } from '../dynamodb';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    PostsModule,
    DynamoDBModule,
  ],
  providers: [GoogleBlogCrawler, CronService, Logger, DynamoDBService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly googleBlogCrawler: GoogleBlogCrawler,
    private readonly logger: Logger,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('app runs');
    try {
      await this.googleBlogCrawler.crawl();
      this.logger.log('Google Blog Crawler: Initialized');
    } catch (err) {
      this.logger.error(`Google Blog Crawler Error: ${err.message}`);
    }
  }
}
