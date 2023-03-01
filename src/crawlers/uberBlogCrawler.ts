import { BaseBlogCrawler } from './baseBlogCrawler';
import { Post } from 'src/posts/interfaces/post.interface';
import { Injectable, Logger } from '@nestjs/common';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';
import cheerio from 'cheerio';
import { UBER_BLOG } from '../constants/blogSources';

@Injectable()
export class UberBlogCrawler extends BaseBlogCrawler {
  protected readonly baseUrl = UBER_BLOG;
  protected readonly blogName = 'Uber';
  protected readonly logger = new Logger(UberBlogCrawler.name);

  constructor(protected readonly dynamoDBService: DynamoDBService) {
    super(dynamoDBService);
  }

  protected getPostElements($: cheerio.Root): cheerio.Cheerio {
    return $(
      'div._FeedCard_feed-meta_3NV, div._FeedHero_feed-hero__right_UOo, div._FeedCard_feed-card_3_M',
    );
  }

  protected extractPostData($: cheerio.Root, element: cheerio.Element): Post {
    let title, link, publishedDate, postOwner;

    if ($(element).hasClass('_FeedCard_feed-meta_3NV')) {
      title = $(element).find('h5._FeedCardMeta_feed-title_2fL').text().trim();
      link = $(element).parent().attr('href');
      publishedDate =
        $(element)
          .find('p._DateRegion_feed-info_2yH')
          .text()
          .split(' / ')[0]
          .trim() || new Date().toISOString();
      if (!publishedDate.includes(',')) {
        const currentYear = new Date().getFullYear();
        publishedDate += `, ${currentYear}`;
      }
      postOwner = $(element)
        .find('p._DateRegion_feed-info_2yH')
        .text()
        .split(' / ')[1]
        .trim();
    } else {
      title = $(element)
        .find('h3._FeedHero_feed-hero__heading_mrl')
        .text()
        .trim();
      link = $(element).find('a._FeedHero_feed-hero__text_GQ9').attr('href');
      publishedDate =
        $(element)
          .find('p._DateRegion_feed-info_2yH')
          .text()
          .split(' / ')[0]
          .trim() || new Date().toISOString();
      if (!publishedDate.includes(',')) {
        const currentYear = new Date().getFullYear();
        publishedDate += `, ${currentYear}`;
      }
      postOwner = $(element)
        .find('p._DateRegion_feed-info_2yH')
        .text()
        .split(' / ')[1]
        .trim();
    }

    return {
      title: this.formatString(title),
      link: `https://www.uber.com${link}`,
      publishedDate: this.formatDateString(publishedDate),
      postOwner: this.formatString(postOwner),
      blogName: this.blogName,
      thumbnail: $(element).find('picture > img')?.attr('src') || '',
    };
  }
}
