import { MICROSOFT_BLOG } from 'src/constants/blogSources';
import { Post } from 'src/posts/interfaces/post.interface';
import { BaseBlogCrawler } from './baseBlogCrawler';
import { Injectable, Logger } from '@nestjs/common';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';
import cheerio from 'cheerio';

@Injectable()
export class MicrosoftBlogCrawler extends BaseBlogCrawler {
  protected readonly baseUrl = MICROSOFT_BLOG;
  protected readonly blogName = 'Microsoft';
  protected readonly logger = new Logger(MicrosoftBlogCrawler.name);

  constructor(protected readonly dynamoDBService: DynamoDBService) {
    super(dynamoDBService);
  }

  protected getPostElements($: cheerio.Root): cheerio.Cheerio {
    return $('article.search-main');
  }

  protected extractPostData($: cheerio.Root, element: cheerio.Element): Post {
    return {
      title: this.formatString($(element).find('h2.entry-title > a').text()),
      link: $(element).find('h2.entry-title > a').attr('href'),
      publishedDate: this.formatDateString(
        $(element).find('div.landing-postdate > span.entry-post-date').text() ||
          new Date().toISOString(),
      ),
      postOwner: this.formatString(
        $(element).find('span.entry-author-link > a').text(),
      ),
      blogName: this.blogName,
    };
  }
}
