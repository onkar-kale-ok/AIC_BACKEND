import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { userDataResponseDto } from 'src/utils/response.dto';

export interface createNewUserInterface {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**Get user by email */
  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email.toLowerCase() },
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  /**Create new user */
  async createUser(data: createNewUserInterface) {
    try {
      const newUser = await this.userRepository.create({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      const result = await this.userRepository.save(newUser);
      if (result) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  /**Get user list */
  async getAllUsers(): Promise<userDataResponseDto> {
    try {
      const result = await this.userRepository.find();
      return {
        statusCode: HttpStatus.FOUND,
        message: 'User list',
        users: result,
      };
    } catch (error) {
      throw error;
    }
  }


  async getUserById(id: number): Promise<any> {
    try {
      const result = await this.userRepository.findOne({where: {id: id}});
      if(result) {
        return {
          statusCode: HttpStatus.FOUND,
          message: 'User list',
          users: result,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
