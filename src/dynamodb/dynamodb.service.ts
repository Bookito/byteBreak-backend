import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDB;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB({
      apiVersion: '2012-08-10',
      region: 'ap-northeast-2', // Replace with your desired region
      credentials: new AWS.Credentials({
        accessKeyId: 'AKIAYOMCEXD33V6YOEEH', // Replace with your IAM user access key ID
        secretAccessKey: 'mNWds2cnA0rxXrA47g3hZskSyVjr/i/6BF3QJrCn', // Replace with your IAM user secret access key
      }),
    });
  }

  async putItem(params: AWS.DynamoDB.PutItemInput): Promise<void> {
    await this.dynamoDB.putItem(params).promise();
  }

  async scan(params: AWS.DynamoDB.ScanInput): Promise<AWS.DynamoDB.ScanOutput> {
    return await this.dynamoDB.scan(params).promise();
  }

  async getItem(
    params: AWS.DynamoDB.GetItemInput,
  ): Promise<AWS.DynamoDB.GetItemOutput> {
    return await this.dynamoDB.getItem(params).promise();
  }

  async deleteItem(params: AWS.DynamoDB.DeleteItemInput): Promise<void> {
    await this.dynamoDB.deleteItem(params).promise();
  }
}