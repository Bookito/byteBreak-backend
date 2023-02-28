import cheerio from 'cheerio';
import { Post } from '../posts/interfaces/post.interface';
import { DynamoDBService } from '../dynamodb/dynamodb.service';
import { Injectable, Logger } from '@nestjs/common';
import { BaseBlogCrawler } from './baseBlogCrawler';
import { TWITTER_ENGINEERING_BLOG } from 'src/constants/blogSources';

@Injectable()
export class TwitterBlogCrawler extends BaseBlogCrawler {
  protected readonly baseUrl = TWITTER_ENGINEERING_BLOG;
  protected readonly blogName = 'Twitter';
  protected readonly logger = new Logger(TwitterBlogCrawler.name);

  constructor(protected readonly dynamoDBService: DynamoDBService) {
    super(dynamoDBService);
  }

  protected getPostElements($: cheerio.Root): cheerio.Cheerio {
    return $('.results-loop__result.result');
  }

  protected extractPostData($: cheerio.Root, element: cheerio.Element): Post {
    return {
      title: this.formatString($(element).find('.result__title').text()),
      link:
        'https://blog.twitter.com' +
        $(element).find('.result__title').attr('href'),
      publishedDate: this.formatDateString(
        $(element).find('.result__byline time').text() ||
          new Date().toISOString(),
      ),
      postOwner: this.formatString(
        $(element).find('.result__byline .blog__author-content a').text(),
      ),
      blogName: this.blogName,
    };
  }
}
