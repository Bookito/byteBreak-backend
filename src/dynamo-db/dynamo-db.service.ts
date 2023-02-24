import { Injectable, Inject } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class DynamoDBService {
  constructor(
    @Inject('DynamoDB') private readonly dynamoDbClient: DocumentClient,
  ) {}

  async getItem(
    params: DocumentClient.GetItemInput,
  ): Promise<DocumentClient.GetItemOutput> {
    return this.dynamoDbClient.get(params).promise();
  }

  async putItem(
    params: DocumentClient.PutItemInput,
  ): Promise<DocumentClient.PutItemOutput> {
    return this.dynamoDbClient.put(params).promise();
  }

  async updateItem(
    params: DocumentClient.UpdateItemInput,
  ): Promise<DocumentClient.UpdateItemOutput> {
    return this.dynamoDbClient.update(params).promise();
  }

  async deleteItem(
    params: DocumentClient.DeleteItemInput,
  ): Promise<DocumentClient.DeleteItemOutput> {
    return this.dynamoDbClient.delete(params).promise();
  }

  async scan(
    params: DocumentClient.ScanInput,
  ): Promise<DocumentClient.ScanOutput> {
    return this.dynamoDbClient.scan(params).promise();
  }
}
