import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result = [
        {
          id: '1',
          title: 'Test Post',
          link: 'http://test.com',
          publishedDate: '2022-02-20',
          postOwner: 'John',
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll('John')).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      const result = {
        id: '1',
        title: 'Test Post',
        link: 'http://test.com',
        publishedDate: '2022-02-20',
        postOwner: 'John',
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne('John', '1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a post', async () => {
      const result = {
        id: '1',
        title: 'Test Post',
        link: 'http://test.com',
        publishedDate: '2022-02-20',
        postOwner: 'John',
      };
      const createPostDto = {
        title: 'Test Post',
        link: 'http://test.com',
        publishedDate: '2022-02-20',
      };
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create('John', createPostDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a post', async () => {
      const result = {
        id: '1',
        title: 'Test Post',
        link: 'http://test.com',
        publishedDate: '2022-02-20',
        postOwner: 'John',
      };
      const updatePostDto = {
        title: 'Updated Test Post',
        link: 'http://updatedtest.com',
        publishedDate: '2022-02-21',
      };
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update('John', '1', updatePostDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should return a post', async () => {
      const result = {
        id: '1',
        title: 'Test Post',
        link: 'http://test.com',
        publishedDate: '2022-02-20',
        postOwner: 'John',
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove('John', '1')).toBe(result);
    });
  });
});
