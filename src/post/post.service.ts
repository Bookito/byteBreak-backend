import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostService {
  constructor(private readonly dynamoDbClient: DynamoDB.DocumentClient) {}

  async getAllPosts(): Promise<any[]> {
    const params = {
      TableName: 'YOUR_TABLE_NAME',
    };

    const result = await this.dynamoDbClient.scan(params).promise();

    return result.Items;
  }

  async getPostById(id: string): Promise<any> {
    const params = {
      TableName: 'YOUR_TABLE_NAME',
      Key: { id },
    };

    const result = await this.dynamoDbClient.get(params).promise();

    return result.Item;
  }

  async createPost(data: any): Promise<void> {
    const params = {
      TableName: 'YOUR_TABLE_NAME',
      Item: {
        id: uuid(),
        title: data.title,
        publishedDate: data.publishedDate,
        postOwner: data.postOwner,
        link: data.link,
      },
    };

    await this.dynamoDbClient.put(params).promise();
  }

  async updatePost(id: string, data: any): Promise<void> {
    const params = {
      TableName: 'YOUR_TABLE_NAME',
      Key: { id },
      UpdateExpression:
        'set title = :t, publishedDate = :p, postOwner = :o, link = :l',
      ExpressionAttributeValues: {
        ':t': data.title,
        ':p': data.publishedDate,
        ':o': data.postOwner,
        ':l': data.link,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    await this.dynamoDbClient.update(params).promise();
  }

  async deletePost(id: string): Promise<void> {
    const params = {
      TableName: 'YOUR_TABLE_NAME',
      Key: { id },
    };

    await this.dynamoDbClient.delete(params).promise();
  }
}
