import { BlogType } from '../enums/blog-type.enum';

export interface Blog {
  title: string;
  link: string;
  blogType: BlogType;
}
