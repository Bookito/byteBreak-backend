import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../dynamodb/dynamodb.service';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async getAllPosts(): Promise<Post[]> {
    const result = await this.dynamoDBService.scanItems(process.env.TABLE_NAME);
    return result.Items.map((item) => ({
      id: uuidv4(),
      title: item.title.S,
      link: item.link.S,
      publishedDate: item.publishedDate.S,
      postOwner: item.postOwner.S,
      blogName: item.blogName.S,
      thumbnail: item.thumbnail?.S,
    }));
  }

  async create(post: Post): Promise<void> {
    await this.dynamoDBService.putItem(process.env.TABLE_NAME, post);
  }
}
