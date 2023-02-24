import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private readonly dynamoDB: DocumentClient;

  constructor() {
    this.dynamoDB = new DocumentClient();
  }

  async create(postOwner: string, createPostDto: CreatePostDto): Promise<Post> {
    const post: Post = {
      id: uuidv4(),
      postOwner,
      ...createPostDto,
    };

    const params = {
      TableName: 'Posts',
      Item: post,
    };

    await this.dynamoDB.put(params).promise();

    return post;
  }

  async findAll(postOwner: string): Promise<Post[]> {
    const params = {
      TableName: 'Posts',
      KeyConditionExpression: 'postOwner = :postOwner',
      ExpressionAttributeValues: {
        ':postOwner': postOwner,
      },
    };

    const result = await this.dynamoDB.query(params).promise();

    return result.Items as Post[];
  }

  async findOne(postOwner: string, postId: string): Promise<Post> {
    const params = {
      TableName: 'Posts',
      Key: {
        postOwner,
        postId,
      },
    };

    const result = await this.dynamoDB.get(params).promise();

    return result.Item as Post;
  }

  async update(
    postOwner: string,
    postId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const params = {
      TableName: 'Posts',
      Key: {
        postOwner,
        postId,
      },
      UpdateExpression:
        'set title = :title, publishedDate = :publishedDate, link = :link',
      ExpressionAttributeValues: {
        ':title': updatePostDto.title,
        ':publishedDate': updatePostDto.publishedDate,
        ':link': updatePostDto.link,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDB.update(params).promise();

    return result.Attributes as Post;
  }

  async remove(postOwner: string, postId: string): Promise<Post> {
    const post = await this.findOne(postOwner, postId);

    const params = {
      TableName: 'Posts',
      Key: {
        postOwner,
        postId,
      },
    };

    await this.dynamoDB.delete(params).promise();

    return post;
  }
}
