import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  app.enableCors();
  // app.enableCors({
  //   origin: 'http://localhost:3000', // Put where byte-break RN app is running on
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });

  // Start crawling bot
  await app.get(CronService).handleCron();

  const logger = new Logger('bootstrap');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
