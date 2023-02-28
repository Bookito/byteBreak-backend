import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { AppModule } from 'app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(CronService).handleCron();

  // Enable CORS for all routes
  app.enableCors();

  const logger = new Logger('bootstrap');

  // Start the app on the specified port (or 3000 if not specified)
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
