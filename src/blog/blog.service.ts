import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Blog } from './entity/entity';

@Injectable()
export class BlogService {
  private posts: Blog[] = [];

  findAll(): Blog[] {
    return this.posts;
  }

  findOne(id: string): Blog {
    return this.posts.find((post) => post.id === id);
  }

  create(post: Blog): Blog {
    const newPost = { id: uuidv4(), ...post };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: string, post: Blog): Blog {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      this.posts[index] = { id, ...post };
      return this.posts[index];
    }
    return null;
  }

  delete(id: string): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
