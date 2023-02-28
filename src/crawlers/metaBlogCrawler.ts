import { META_BLOG } from 'src/constants/blogSources';
import { Post } from 'src/posts/interfaces/post.interface';
import { BaseBlogCrawler } from './baseBlogCrawler';
import { Injectable, Logger } from '@nestjs/common';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';
import cheerio from 'cheerio';

@Injectable()
export class MetaBlogCrawler extends BaseBlogCrawler {
  protected readonly baseUrl = META_BLOG;
  protected readonly blogName = 'Meta';
  protected readonly logger = new Logger(MetaBlogCrawler.name);

  constructor(protected readonly dynamoDBService: DynamoDBService) {
    super(dynamoDBService);
  }

  protected getPostElements($: cheerio.Root): cheerio.Cheerio {
    return $('article.post');
  }

  protected extractPostData($: cheerio.Root, element: cheerio.Element): Post {
    return {
      title: this.formatString(
        $(element).find('.entry-title > div > a').text(),
      ),
      link: $(element).find('.entry-title > div > a').attr('href'),
      publishedDate: this.formatDateString(
        $(element).find('.posted-on > time').attr('datetime') ||
          new Date().toISOString(),
      ),
      postOwner: this.formatString(this.blogName),
      blogName: this.blogName,
    };
  }
}
