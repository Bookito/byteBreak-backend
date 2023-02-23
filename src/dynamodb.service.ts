import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDbClient: AWS.DynamoDB;

  constructor() {
    this.dynamoDbClient = new AWS.DynamoDB({
      region: 'ap-northeast-2',
      endpoint: 'http://localhost:8000', // Use the correct endpoint for your deployment
    });
  }

  async putItem(
    params: AWS.DynamoDB.PutItemInput,
  ): Promise<AWS.DynamoDB.PutItemOutput> {
    return this.dynamoDbClient.putItem(params).promise();
  }

  async getItem(
    params: AWS.DynamoDB.GetItemInput,
  ): Promise<AWS.DynamoDB.GetItemOutput> {
    return this.dynamoDbClient.getItem(params).promise();
  }

  async updateItem(
    params: AWS.DynamoDB.UpdateItemInput,
  ): Promise<AWS.DynamoDB.UpdateItemOutput> {
    return this.dynamoDbClient.updateItem(params).promise();
  }

  async deleteItem(
    params: AWS.DynamoDB.DeleteItemInput,
  ): Promise<AWS.DynamoDB.DeleteItemOutput> {
    return this.dynamoDbClient.deleteItem(params).promise();
  }
}
