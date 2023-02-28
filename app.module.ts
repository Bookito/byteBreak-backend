import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { AwsBlogCrawler } from './src/crawlers/awsBlogCrawler'; // Import the AwsBlogCrawler
import { GoogleBlogCrawler } from './src/crawlers/googleBlogCrawler';
import { CronService } from './src/cron/cron.service';
import { DynamoDBModule } from 'src/dynamodb/dynamodb.module';
import { MicrosoftBlogCrawler } from './src/crawlers/microsoftBlogCrawler';
import { MetaBlogCrawler } from './src/crawlers/metaBlogCrawler';
import { TwitterBlogCrawler } from './src/crawlers/twitterBlogCrawler';
import { UberBlogCrawler } from './src/crawlers/uberBlogCrawler';
import { LinkedInBlogCrawler } from './src/crawlers/linkedInBlogCrawler';

@Module({
  imports: [DynamoDBModule, PostsModule],
  controllers: [],
  providers: [
    AwsBlogCrawler,
    GoogleBlogCrawler,
    MicrosoftBlogCrawler,
    MetaBlogCrawler,
    TwitterBlogCrawler,
    UberBlogCrawler,
    LinkedInBlogCrawler,
    CronService,
  ],
})
export class AppModule {}
