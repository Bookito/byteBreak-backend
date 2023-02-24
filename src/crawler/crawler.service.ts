import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { Blog } from '../../interfaces/blog.interface';
import { BlogType } from '../../enums/blog-type.enum';

@Injectable()
export class CrawlerService {
  constructor(private readonly postService: PostsService) {}

  async crawl() {
    const blogs: Blog[] = [
      { title: BlogType.TECH_CRUNCH, url: 'https://techcrunch.com/' },
      { title: BlogType.THE_VERGE, url: 'https://www.theverge.com/' },
      { title: BlogType.RECODE, url: 'https://www.recode.net/' },
    ];

    for (const blog of blogs) {
      const response = await axios.get(blog.url);
      const html = response.data;
      const $ = cheerio.load(html);

      switch (blog.type) {
        case BlogType.TECH_CRUNCH:
          $('.post-block__title').each((i, element) => {
            const title = $(element).text();
            const link = $(element).children().attr('href');
            const publishedDate = $(element)
              .siblings('.river-byline__time')
              .text();
            const data: CreatePostDto = {
              title,
              publishedDate,
              link,
              postOwner: 'admin',
            };
            this.postService.createPost(data);
          });
          break;
        case BlogType.THE_VERGE:
          $('.c-entry-box--compact__title').each((i, element) => {
            const title = $(element).text();
            const link = $(element).children().attr('href');
            const publishedDate = $(element)
              .siblings('.c-byline')
              .find('time')
              .attr('datetime');
            const data: CreatePostDto = {
              title,
              publishedDate,
              link,
              postOwner: 'admin',
            };
            this.postService.createPost(data);
          });
          break;
        case BlogType.RECODE:
          $('.c-entry-box--compact__title').each((i, element) => {
            const title = $(element).text();
            const link = $(element).children().attr('href');
            const publishedDate = $(element)
              .siblings('.c-byline')
              .find('time')
              .attr('datetime');
            const data: CreatePostDto = {
              title,
              publishedDate,
              link,
              postOwner: 'admin',
            };
            this.postService.createPost(data);
          });
          break;
        default:
          break;
      }
    }
  }
}
