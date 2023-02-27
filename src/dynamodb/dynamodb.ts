import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB();

const params = {
  TableName: 'Posts',
  KeySchema: [
    { AttributeName: 'title', KeyType: 'HASH' },
    { AttributeName: 'link', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'title', AttributeType: 'S' },
    { AttributeName: 'link', AttributeType: 'S' },
    { AttributeName: 'publishedDate', AttributeType: 'S' },
    { AttributeName: 'postOwner', AttributeType: 'S' },
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

dynamoDb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table:', err);
  } else {
    console.log('Created table:', data);
  }
});
