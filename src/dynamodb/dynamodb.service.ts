import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDB;

  constructor(private readonly configService: ConfigService) {
    this.dynamoDB = new AWS.DynamoDB({
      apiVersion: '2012-08-10',
      region: 'ap-northeast-2', // Replace with your desired region
      credentials: new AWS.Credentials({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
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
