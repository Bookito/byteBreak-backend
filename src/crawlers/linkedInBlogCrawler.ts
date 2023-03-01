import { Post } from '../posts/interfaces/post.interface';
import { BaseBlogCrawler } from './baseBlogCrawler';
import { Injectable, Logger } from '@nestjs/common';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';
import cheerio from 'cheerio';
import { LINKEDIN_ENGINEERING_BLOG } from 'src/constants/blogSources';

@Injectable()
export class LinkedInBlogCrawler extends BaseBlogCrawler {
  protected readonly baseUrl = LINKEDIN_ENGINEERING_BLOG;
  protected readonly blogName = 'LinkedIn Engineering';
  protected readonly logger = new Logger(LinkedInBlogCrawler.name);

  constructor(protected readonly dynamoDBService: DynamoDBService) {
    super(dynamoDBService);
  }

  protected getPostElements($: cheerio.Root): cheerio.Cheerio {
    return $('li.post-li');
  }

  protected extractPostData($: cheerio.Root, element: cheerio.Element): Post {
    return {
      title: this.formatString(
        this.formatString($(element).find('h2.heading > a').text()),
      ),
      link: `https://engineering.linkedin.com${$(element)
        .find('h2.heading > a')
        .attr('href')}`,
      publishedDate: this.formatDateString(
        $(element).find('span.timestamp').text(),
      ),
      postOwner: this.formatString($(element).find('span.author > a').text()),
      blogName: this.blogName,
      thumbnail:
        $(element).find('img.lazy-load-src')?.attr('data-background-src') || '',
    };
  }
}
