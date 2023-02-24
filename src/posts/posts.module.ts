import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DynamoDBService } from '../dynamodb';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, DynamoDBService],
})
export class PostsModule {}
