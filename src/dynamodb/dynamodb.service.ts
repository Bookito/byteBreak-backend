import { Injectable } from '@nestjs/common';
import {
  CreateTableCommand,
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Post } from 'src/posts/interfaces/post.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      TableName: process.env.TABLE_NAME,
      KeySchema: [
        { AttributeName: 'title', KeyType: 'HASH' },
        { AttributeName: 'link', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'title', AttributeType: 'S' },
        { AttributeName: 'link', AttributeType: 'S' },
        { AttributeName: 'publishedDate', AttributeType: 'S' },
        { AttributeName: 'postOwner', AttributeType: 'S' },
        { AttributeName: 'blogName', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'UniquePosts',
          KeySchema: [
            { AttributeName: 'publishedDate', KeyType: 'HASH' },
            { AttributeName: 'postOwner', KeyType: 'RANGE' },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
          // Ensure the index has a unique constraint
          IndexOptions: {
            // The following options are available:
            //  - ALL: The index is updated every time an item is updated, inserted, or deleted.
            //  - NEW_IMAGE: The index is updated only when a new item is inserted or an existing item is updated.
            //  - OLD_IMAGE: The index is updated only when an existing item is deleted.
            //  - NONE: The index is not updated when an item is inserted, updated, or deleted.
            Update: 'ALL',
            // Set this option to true to enforce a unique constraint on the index
            EnforceUniqueConstraint: true,
          },
        },
      ],
    };

    const command = new CreateTableCommand(params);
    this.client
      .send(new ScanCommand({ TableName: process.env.TABLE_NAME }))
      .then(() => console.log('Table exists'))
      .catch(() => {
        this.client
          .send(command)
          .then(() => console.log('Table created'))
          .catch((error) => console.error(error));
      });
  }

  async getAllPosts(): Promise<Post[]> {
    const params = {
      TableName: process.env.TABLE_NAME,
    };

    try {
      const command = new ScanCommand(params);
      const result = await this.client.send(command);

      return (result.Items || []).map((item) => unmarshall(item) as Post);
    } catch (error) {
      console.error('Error in DynamoDBService.getAllPosts:', error);
      return [];
    }
  }

  async create(post: Post): Promise<Post> {
    try {
      const id = uuidv4();
      const item = { ...post, id };

      const putParams = {
        TableName: process.env.TABLE_NAME,
        Item: marshall(item),
      };

      const putCommand = new PutItemCommand(putParams);
      await this.client.send(putCommand);

      return item;
    } catch (error) {
      console.error('Error in DynamoDBService.create:', error);
      return null;
    }
  }

  async scanItems(tableName: string): Promise<ScanCommandOutput> {
    const command = new ScanCommand({ TableName: tableName });
    return await this.client.send(command);
  }

  async putItem(tableName: string, item: Post): Promise<void> {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: marshall(item),
    });

    await this.client.send(command);
  }
}
