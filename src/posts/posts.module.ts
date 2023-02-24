import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DynamoDBModule } from '../dynamo-db/dynamo-db.module';

@Module({
  imports: [DynamoDBModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
