import { BlogType } from 'src/scraper/enums/blog-type.enum';

export interface Blog {
  title: string;
  url: string;
  publishedDate?: string;
  blogType?: BlogType;
  type?: string; // add the new property to the interface
}
