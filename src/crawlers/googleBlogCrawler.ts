import { Injectable, Logger } from '@nestjs/common';
import { Post } from '../posts/interfaces/post.interface';
import { GOOGLE_DEVELOPERS_BLOG } from 'src/constants/blogSources';
import { BaseBlogCrawler } from './baseBlogCrawler';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';
import cheerio from 'cheerio';

@Injectable()
export class GoogleBlogCrawler extends BaseBlogCrawler {
  protected readonly baseUrl = GOOGLE_DEVELOPERS_BLOG;
  protected readonly blogName = 'Google';
  protected readonly logger = new Logger(GoogleBlogCrawler.name);

  constructor(protected readonly dynamoDBService: DynamoDBService) {
    super(dynamoDBService);
  }

  protected getPostElements($: cheerio.Root): cheerio.Cheerio {
    return $('.dgc-card');
  }

  protected extractPostData($: cheerio.Root, element: cheerio.Element): Post {
    return {
      title: this.formatString(
        $(element).find('.dgc-card__title').text().trim(),
      ),
      link: $(element).find('.dgc-card__href').attr('href'),
      publishedDate: this.formatDateString(
        $(element).find('.dgc-card__info > p').text().trim() ||
          new Date().toISOString(),
      ),
      postOwner: this.formatString(
        $(element).find('.dgc-card__description > p').text().trim(),
      ),
      blogName: this.blogName,
    };
  }
}
