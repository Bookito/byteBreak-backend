import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { CronService } from 'src/cron/cron.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  app.enableCors();

  // Start crawling bot
  const cronService = app.get(CronService);
  await cronService.handleGoogleBlogCron();
  await cronService.handleAwsBlogCron();
  await cronService.handleMicrosoftBlogCron();
  await cronService.handleMetaBlogCron();
  await cronService.handleTwitterBlogCron();
  await cronService.handleUberBlogCron();
  await cronService.handleLinkedInBlogCron();

  const logger = new Logger('bootstrap');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
