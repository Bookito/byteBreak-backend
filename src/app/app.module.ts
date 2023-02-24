import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '../posts/posts.module';
import { CrawlerModule } from '../scraper/crawler.module';
import { DynamoDBModule } from './dynamo-db/dynamo-db.module';

@Module({
  imports: [ConfigModule.forRoot(), PostsModule, CrawlerModule, DynamoDBModule],
})
export class AppModule {}
