import * as AWS from 'aws-sdk';

export const dynamoDBServiceProvider = {
  provide: 'DynamoDBService',
  useFactory: () => new AWS.DynamoDB.DocumentClient(),
};
