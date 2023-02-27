import { Module } from '@nestjs/common';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';
import { PostsModule } from 'src/posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleBlogCrawler } from '../crawlers/googleBlogCrawler';
import { CronService } from '../cron/cron.service';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService, DynamoDBService, CronService, GoogleBlogCrawler],
})
export class AppModule {}
