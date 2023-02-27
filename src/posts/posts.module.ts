import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DynamoDBService } from '../dynamodb';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Import the ConfigModule here
  controllers: [PostsController],
  providers: [PostsService, DynamoDBService],
})
export class PostsModule {}
