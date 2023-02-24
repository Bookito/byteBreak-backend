import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDB.DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient();
  }

  async put(params: DynamoDB.DocumentClient.PutItemInput) {
    return this.client.put(params).promise();
  }

  async scan(params: DynamoDB.DocumentClient.ScanInput) {
    return this.client.scan(params).promise();
  }

  async get(params: DynamoDB.DocumentClient.GetItemInput) {
    return this.client.get(params).promise();
  }

  async delete(params: DynamoDB.DocumentClient.DeleteItemInput) {
    return this.client.delete(params).promise();
  }
}
