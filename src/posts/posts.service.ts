import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DynamoDBService } from 'src/dynamo-db/dynamo-db.service';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly dynamoDBService: DynamoDBService,
    @Inject('Posts') private readonly postsTableName: string,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const params = {
      TableName: this.postsTableName,
    };
    const result = await this.dynamoDBService.scan(params).promise();
    return result.Items as Post[];
  }

  async getPostById(id: string): Promise<Post> {
    const params = {
      TableName: this.postsTableName,
      Key: {
        postId: id,
      },
    };
    const result = await this.dynamoDBService.get(params).promise();
    return result.Item as Post;
  }

  async createPost(data: CreatePostDto): Promise<void> {
    const newPost: Post = {
      id: uuid(),
      title: data.title,
      link: data.link,
      publishedDate: data.publishedDate,
      postOwner: data.postOwner,
    };
    const params = {
      TableName: this.postsTableName,
      Item: newPost,
    };
    await this.dynamoDBService.put(params).promise();
  }

  async updatePost(id: string, data: UpdatePostDto): Promise<void> {
    const params = {
      TableName: this.postsTableName,
      Key: {
        postId: id,
      },
      UpdateExpression:
        'set title = :title, link = :link, publishedDate = :publishedDate, postOwner = :postOwner',
      ExpressionAttributeValues: {
        ':title': data.title,
        ':link': data.link,
        ':publishedDate': data.publishedDate,
        ':postOwner': data.postOwner,
      },
    };
    await this.dynamoDBService.update(params).promise();
  }

  async deletePost(id: string): Promise<void> {
    const params = {
      TableName: this.postsTableName,
      Key: {
        postId: id,
      },
    };
    await this.dynamoDBService.delete(params).promise();
  }
}
