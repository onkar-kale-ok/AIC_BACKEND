import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
    constructor(
    @InjectRepository(Page) private readonly pageRepository: Repository<Page>,
  ) {}
  
  create(createPageDto: CreatePageDto) {
    return 'This action adds a new page';
  }

      async getAllPages(): Promise<any> {
    const result = await this.pageRepository.find();
    return {
      statusCode: 200,
      message: 'User list',
      users: result,
    };
  }

  findAll() {
    return `This action returns all pages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
