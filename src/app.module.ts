import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { dynamoDBServiceProvider } from './dynamodb.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, dynamoDBServiceProvider],
})
export class AppModule {}
