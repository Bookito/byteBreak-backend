import { Module } from '@nestjs/common';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import AWS from 'aws-sdk';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'AWS_REGION',
      useValue: process.env.AWS_REGION,
    },
    {
      provide: 'AWS_DYNAMODB_ENDPOINT',
      useValue: process.env.AWS_DYNAMODB_ENDPOINT,
    },
    {
      provide: 'DynamoDB',
      useFactory: () => new AWS.DynamoDB.DocumentClient(),
    },
  ],
})
export class AppModule {}
