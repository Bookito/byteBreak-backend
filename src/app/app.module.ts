import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from '../posts/posts.module';
import { CrawlerModule } from '../crawler/crawler.module';

@Module({
  imports: [ConfigModule.forRoot(), PostsModule, CrawlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
