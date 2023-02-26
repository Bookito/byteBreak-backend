import axios from 'axios';
import cheerio from 'cheerio';
import { ConfigService } from '@nestjs/config';
import { DynamoDBService } from '../../dynamodb';

export class GoogleBlogCrawler {
  constructor(
    private readonly dynamoDBService: DynamoDBService,
    private readonly configService: ConfigService,
  ) {}

  async crawl() {
    const blogUrl = 'https://developers.googleblog.com/';
    const response = await axios.get(blogUrl);
    const $ = cheerio.load(response.data);

    for (const el of $('.dgc-card').get()) {
      const postTitle = $(el).find('.dgc-card__title').text().trim();
      const postLink = $(el).find('.dgc-card__href').attr('href');
      const postDate = $(el).find('.dgc-card__info > p').text().trim();
      const postOwner = $(el).find('.dgc-card__description > p').text().trim();

      const params = {
        TableName: 'Posts',
        Key: { link: { S: postLink } },
      };

      const existingItem = await this.dynamoDBService.getItem(params);

      if (!existingItem.Item) {
        const params = {
          TableName: 'Posts',
          Item: {
            title: { S: postTitle },
            link: { S: postLink },
            publishedDate: { S: postDate },
            postOwner: { S: postOwner },
          },
        };

        await this.dynamoDBService.putItem(params);
      }
    }
  }
}
