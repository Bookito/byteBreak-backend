import axios from 'axios';
import cheerio from 'cheerio';
import { Post } from '../posts/interfaces/post.interface';
import { DynamoDBService } from '../dynamodb/dynamodb.service';
import { Logger } from '@nestjs/common';

export abstract class BaseBlogCrawler {
  protected abstract readonly baseUrl: string;
  protected abstract readonly blogName: string;
  protected abstract readonly logger: Logger;

  constructor(protected readonly dynamoDBService: DynamoDBService) {}

  async crawl(): Promise<void> {
    const response = await axios.get(this.baseUrl);
    const $ = cheerio.load(response.data);
    const posts = this.getPostElements($);

    const newPosts: Post[] = [];

    posts.each((i: number, element: cheerio.Element) => {
      const post = this.extractPostData($, element);
      newPosts.push(post);
    });

    const existingPosts = await this.dynamoDBService.getAllPosts();
    const uniquePosts = this.getUniquePosts(existingPosts, newPosts);

    for (const post of uniquePosts) {
      await this.dynamoDBService.create(post);
      console.log(`Crawled and stored new post: ${post.title}`);
    }
  }

  protected abstract getPostElements($: cheerio.Root): cheerio.Cheerio;

  protected abstract extractPostData(
    $: cheerio.Root,
    element: cheerio.Element,
  ): Post;

  private getUniquePosts(existingPosts: Post[], newPosts: Post[]): Post[] {
    const existingLinks = existingPosts.map((post) => post.link);

    return newPosts.filter((post) => !existingLinks.includes(post.link));
  }

  protected formatDateString(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }
}
