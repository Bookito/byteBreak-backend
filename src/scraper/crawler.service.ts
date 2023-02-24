import { Injectable, Logger } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { BlogType } from './enums/blog-type.enum';
import { Blog } from './interfaces/blog.interface';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  async crawlBlogs(): Promise<Blog[]> {
    const feedUrls = [
      {
        type: BlogType.GOOGLE,
        url: 'https://developers.googleblog.com/feeds/posts/default?alt=rss',
      },
      { type: BlogType.AMAZON, url: 'https://aws.amazon.com/blogs/aws/feed/' },
      {
        type: BlogType.MICROSOFT,
        url: 'https://devblogs.microsoft.com/aspnet/feed/',
      },
      { type: BlogType.FACEBOOK, url: 'https://engineering.fb.com/feed/' },
      {
        type: BlogType.INSTAGRAM,
        url: 'https://instagram-engineering.com/feed',
      },
      {
        type: BlogType.LINKEDIN,
        url: 'https://engineering.linkedin.com/blog.rss.xml',
      },
      { type: BlogType.NETFLIX, url: 'https://netflixtechblog.com/feed' },
      {
        type: BlogType.TWITTER,
        url: 'https://blog.twitter.com/engineering/en_us/topics/insights.rss',
      },
      {
        type: BlogType.AIRBNB,
        url: 'https://medium.com/airbnb-engineering/feed',
      },
      { type: BlogType.UBER, url: 'https://eng.uber.com/feed' },
      { type: BlogType.SLACK, url: 'https://slack.engineering/feed' },
      { type: BlogType.DROPBOX, url: 'https://dropbox.tech/feed' },
      { type: BlogType.TWITCH, url: 'https://blog.twitch.tv/feed' },
      {
        type: BlogType.PINTEREST,
        url: 'https://medium.com/feed/pinterest-engineering',
      },
      {
        type: BlogType.EVERNOTE,
        url: 'https://evernote.com/blog/category/engineering/feed',
      },
    ];

    const blogs: Blog[] = [];
    const parser = new Parser();

    await Promise.all(
      feedUrls.map(async (feedUrl) => {
        const feed = await parser.parseURL(feedUrl.url);
        feed.items.forEach((item) => {
          const blog: Blog = {
            title: item.title,
            link: item.link,
            publishedDate: item.pubDate,
            blogType: feedUrl.type,
          };
          blogs.push(blog);
        });
        this.logger.debug(
          `Fetched ${feed.items.length} blogs for ${feedUrl.type}`,
        );
      }),
    );

    return blogs;
  }
}
