import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! This is a learning project with nestjs + mysql. Please add "apis" in the route url to access swagger';
  }
}
