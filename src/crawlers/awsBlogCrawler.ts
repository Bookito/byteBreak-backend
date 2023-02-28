import { AWS_BLOG } from 'src/constants/blogSources';
import { Post } from 'src/posts/interfaces/post.interface';
import { BaseBlogCrawler } from './baseBlogCrawler';
import { Injectable, Logger } from '@nestjs/common';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';
import cheerio from 'cheerio';

@Injectable()
export class AwsBlogCrawler extends BaseBlogCrawler {
  protected readonly baseUrl = AWS_BLOG;
  protected readonly blogName = 'AWS';
  protected readonly logger = new Logger(AwsBlogCrawler.name);

  constructor(protected readonly dynamoDBService: DynamoDBService) {
    super(dynamoDBService);
  }

  protected getPostElements($: cheerio.Root): cheerio.Cheerio {
    return $('article.blog-post');
  }

  protected extractPostData($: cheerio.Root, element: cheerio.Element): Post {
    return {
      title: this.formatString(
        $(element).find('h2.blog-post-title > a > span').text(),
      ),
      link: $(element).find('h2.blog-post-title > a').attr('href'),
      publishedDate: this.formatDateString(
        $(element).find('footer.blog-post-meta > time').attr('datetime') ||
          new Date().toISOString(),
      ),
      postOwner: this.formatString(
        $(element).find('footer.blog-post-meta > span > a').text(),
      ),
      blogName: this.blogName,
    };
  }
}
