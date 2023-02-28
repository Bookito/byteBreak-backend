import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsBlogCrawler } from '../crawlers/awsBlogCrawler'; // Import the AwsBlogCrawler
import { GoogleBlogCrawler } from '../crawlers/googleBlogCrawler';
import { CronService } from '../cron/cron.service';
import { DynamoDBModule } from 'src/dynamodb/dynamodb.module';
import { MicrosoftBlogCrawler } from '../crawlers/microsoftBlogCrawler';
import { MetaBlogCrawler } from '../crawlers/metaBlogCrawler';
import { TwitterBlogCrawler } from '../crawlers/twitterBlogCrawler';

@Module({
  imports: [DynamoDBModule, PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    AwsBlogCrawler,
    GoogleBlogCrawler,
    MicrosoftBlogCrawler,
    MetaBlogCrawler,
    TwitterBlogCrawler,
    CronService,
  ],
})
export class AppModule {}
