import { Injectable } from '@nestjs/common';
import { Blog } from './interfaces/blog.interface';
import * as Parser from 'rss-parser';

@Injectable()
export class CrawlerService {
  async crawlBlog(blog: Blog): Promise<any[]> {
    const parser = new Parser();
    const feed = await parser.parseURL(blog.link);
    return feed.items.map((item) => ({
      title: item.title,
      publishedDate: item.pubDate,
      link: item.link,
      postOwner: blog.blogType,
    }));
  }
}
