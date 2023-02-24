import { Injectable } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AWS_REGION } from '../app/app.constants';

@Injectable()
export class DynamoDBService {
  private readonly documentClient: DocumentClient;

  constructor() {
    this.documentClient = new DocumentClient({ region: AWS_REGION });
  }

  async put(
    params: DocumentClient.PutItemInput,
  ): Promise<DocumentClient.PutItemOutput> {
    return this.documentClient.put(params).promise();
  }

  async get(
    params: DocumentClient.GetItemInput,
  ): Promise<DocumentClient.GetItemOutput> {
    return this.documentClient.get(params).promise();
  }

  async delete(
    params: DocumentClient.DeleteItemInput,
  ): Promise<DocumentClient.DeleteItemOutput> {
    return this.documentClient.delete(params).promise();
  }

  async scan(
    params: DocumentClient.ScanInput,
  ): Promise<DocumentClient.ScanOutput> {
    return this.documentClient.scan(params).promise();
  }
}
