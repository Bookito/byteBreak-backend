import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

import { Post } from '../posts/interfaces/post.interface';
import { DynamoDBService } from '../dynamodb/dynamodb.service';

@Injectable()
export class GoogleBlogCrawler {
  private readonly baseUrl = 'https://developers.googleblog.com/';
  private readonly blogPath = '/';

  private readonly logger = new Logger(GoogleBlogCrawler.name);

  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async crawl(): Promise<void> {
    const response = await axios.get(this.baseUrl + this.blogPath);
    const $ = cheerio.load(response.data);
    const posts = $('.dgc-card');

    const newPosts: Post[] = [];

    posts.each((i, element) => {
      const post = {
        title: $(element).find('.dgc-card__title').text().trim(),
        link: $(element).find('.dgc-card__href').attr('href'),
        publishedDate: $(element).find('.dgc-card__info > p').text().trim(),
        postOwner: $(element).find('.dgc-card__description > p').text().trim(),
        blogName: 'Google',
      };

      newPosts.push(post);
    });

    const existingPosts = await this.dynamoDBService.getAllPosts();
    const uniquePosts = this.getUniquePosts(existingPosts, newPosts);

    for (const post of uniquePosts) {
      await this.dynamoDBService.create(post);
      this.logger.log(`Crawled and stored new post: ${post.title}`);
    }
  }

  private getUniquePosts(existingPosts: Post[], newPosts: Post[]): Post[] {
    const existingLinks = existingPosts.map((post) => post.link);

    return newPosts.filter((post) => !existingLinks.includes(post.link));
  }
}
