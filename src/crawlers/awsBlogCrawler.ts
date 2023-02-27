import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { Post } from '../posts/interfaces/post.interface';
import { DynamoDBService } from '../dynamodb/dynamodb.service';
import { AWS_BLOG } from '../constants/blogSources';

@Injectable()
export class AwsBlogCrawler {
  private readonly baseUrl = AWS_BLOG;

  private readonly logger = new Logger(AwsBlogCrawler.name);

  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async crawl(): Promise<void> {
    const response = await axios.get(this.baseUrl);
    const $ = cheerio.load(response.data);
    const posts = $('article.blog-post');

    const newPosts: Post[] = [];

    posts.each((i, element) => {
      const post = {
        title: $(element).find('h2.blog-post-title > a > span').text(),
        link: $(element).find('h2.blog-post-title > a').attr('href'),
        publishedDate: $(element)
          .find('footer.blog-post-meta > time')
          .attr('datetime'),
        postOwner: $(element).find('footer.blog-post-meta > span > a').text(),
        blogName: 'AWS',
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
