import axios from 'axios';
import cheerio from 'cheerio';
import { Blog } from './interfaces/blog.interface';
import { BlogType } from './enums/blog-type.enum';

export class Scraper {
  async scrape(url: string, blogType: BlogType): Promise<Blog[]> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const blogList = $('article');

    const blogs: Blog[] = [];

    blogList.each((index, element) => {
      const titleElement = $(element).find('h2');
      const linkElement = $(element).find('a');
      const publishedDateElement = $(element).find('time');

      const blog: Blog = {
        title: titleElement.text().trim(),
        link: linkElement.attr('href'),
        publishedDate: publishedDateElement.attr('datetime'),
        blogType: blogType,
      };

      blogs.push(blog);
    });

    return blogs;
  }
}
