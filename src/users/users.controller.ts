import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDataResponseDto } from 'src/utils/response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<userDataResponseDto> {
    return await this.usersService.getAllUsers();
  }

  @Get('details/:id')
  async getUserById(@Param('id') id: number) : Promise<any> {
    return await this.usersService.getUserById(id);
  }
}
