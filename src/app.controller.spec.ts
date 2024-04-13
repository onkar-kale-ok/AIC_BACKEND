import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello! This is a learning project with nestjs + mysql. Please add "apis" in the route url to access swagger"', () => {
      expect(appController.getHello()).toBe(
        'Hello! This is a learning project with nestjs + mysql. Please add "apis" in the route url to access swagger',
      );
    });
  });
});
