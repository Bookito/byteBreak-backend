import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDB;

  constructor(private readonly configService: ConfigService) {
    console.log('DynamoDBService constructor called');
    this.dynamoDB = new AWS.DynamoDB({
      apiVersion: '2012-08-10',
      region: 'ap-northeast-2',
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
    try {
      return await this.dynamoDB.getItem(params).promise();
    } catch (err) {
      console.error(`Error calling getItem: ${err.message}`);
      throw err;
    }
  }

  async deleteItem(params: AWS.DynamoDB.DeleteItemInput): Promise<void> {
    await this.dynamoDB.deleteItem(params).promise();
  }
}
