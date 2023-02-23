import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set the AWS region where your DynamoDB table is located
  AWS.config.update({ region: 'ap-northeast-2' });

  // Create a new DynamoDB client
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  // Bind the DynamoDB client to your app
  app.use((req, res, next) => {
    req.dynamoDB = dynamoDB;
    next();
  });

  app.enableCors();
  await app.listen(3000);
}

bootstrap();
