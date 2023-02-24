import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private readonly TABLE_NAME = process.env.DYNAMODB_TABLE;

  constructor(private readonly dynamoDB: DynamoDB) {}

  async getAllPosts(): Promise<any[]> {
    const params = {
      TableName: this.TABLE_NAME,
    };

    const result = await this.dynamoDB.scan(params).promise();

    return result.Items;
  }

  async getPostById(id: string): Promise<any> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        id: { S: id },
      },
    };

    const result = await this.dynamoDB.getItem(params).promise();

    return result.Item;
  }

  async createPost(data: CreatePostDto): Promise<void> {
    const params = {
      TableName: this.TABLE_NAME,
      Item: {
        id: { S: uuid() },
        title: { S: data.title },
        publishedDate: { S: data.publishedDate },
        postOwner: { S: data.postOwner },
        link: { S: data.link },
      },
    };

    await this.dynamoDB.putItem(params).promise();
  }

  async updatePost(id: string, data: UpdatePostDto): Promise<void> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        id: { S: id },
      },
      UpdateExpression:
        'set #title = :title, #publishedDate = :publishedDate, #postOwner = :postOwner, #link = :link',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#publishedDate': 'publishedDate',
        '#postOwner': 'postOwner',
        '#link': 'link',
      },
      ExpressionAttributeValues: {
        ':title': { S: data.title },
        ':publishedDate': { S: data.publishedDate },
        ':postOwner': { S: data.postOwner },
        ':link': { S: data.link },
      },
    };

    await this.dynamoDB.updateItem(params).promise();
  }

  async deletePost(id: string): Promise<void> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        id: { S: id },
      },
    };

    await this.dynamoDB.deleteItem(params).promise();
  }
}
