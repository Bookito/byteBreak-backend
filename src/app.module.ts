import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { AwsBlogCrawler } from './crawlers/awsBlogCrawler'; // Import the AwsBlogCrawler
import { GoogleBlogCrawler } from './crawlers/googleBlogCrawler';
import { CronService } from './cron/cron.service';
import { DynamoDBModule } from 'src/dynamodb/dynamodb.module';
import { MicrosoftBlogCrawler } from './crawlers/microsoftBlogCrawler';
import { MetaBlogCrawler } from './crawlers/metaBlogCrawler';
import { TwitterBlogCrawler } from './crawlers/twitterBlogCrawler';
import { UberBlogCrawler } from './crawlers/uberBlogCrawler';
import { LinkedInBlogCrawler } from './crawlers/linkedInBlogCrawler';

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
