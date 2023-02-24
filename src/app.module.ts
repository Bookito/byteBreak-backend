import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler/crawler.service';
import { PostsController } from './posts/posts.controller';
import { DynamodbService } from './dynamodb/dynamodb.service';
import { DynamoDbService } from './dynamo-db/dynamo-db.service';
import { PostsService } from './posts/posts.service';
import { CrawlerController } from './crawler/crawler.controller';
import * as AWS from 'aws-sdk';

@Module({
  providers: [
    {
      provide: 'AWS',
      useFactory: () => {
        return new AWS.DynamoDB.DocumentClient({
          credentials: new AWS.EC2MetadataCredentials(),
        });
      },
    },
    CrawlerService,
    DynamodbService,
    DynamoDbService,
    PostsService,
  ],
  controllers: [PostsController, CrawlerController],
})
export class AppModule {}
