import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { commonResponseDto, responseDataDto } from 'src/utils/response.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**New user sign up */
  async signUp(data: CreateUserDto): Promise<commonResponseDto> {
    try {
      const user = await this.usersService.getUserByEmail(data.email);
      if (user) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      const password = await bcrypt.hash(data.password, 10);
      const newUser = {
        name: data.name,
        email: data.email,
        password: password,
      };
      const result = await this.usersService.createUser(newUser);
      if (!result) {
        throw new HttpException('Failed to sign up', HttpStatus.BAD_REQUEST);
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'You have signed up successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  /**User sign in */
  async signIn(data: SignInDto): Promise<responseDataDto> {
    try {
      const user = await this.usersService.getUserByEmail(data.email);
      if (!user) {
        throw new HttpException(
          'Account with this email not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (!passwordMatch) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }
      const payload = {
        sub: user.id,
        email: user.email,
      };
      delete user.password;
      const token = this.jwtService.sign(payload);
      if (token) {
        return {
          statusCode: HttpStatus.OK,
          message: 'You have signed in successfully',
          data: {
            user,
            token,
          },
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
