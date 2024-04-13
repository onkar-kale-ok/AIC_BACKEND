import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';
import { Roles } from '../users/entities/user.entity';
import { User } from 'src/users/entities/User';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Sign-Up', () => {
    const userTestDto = {
      name: 'falguni',
      email: 'falguni.suthar@gmail.com',
      password: 'password',
      role: Roles.USER,
    };

    const res = {
      statusCode: HttpStatus.CREATED,
      message: 'You have signed up successfully',
    };

    it('Email should not exist', async () => {
      jest
        .spyOn(UsersService.prototype, 'getUserByEmail')
        .mockResolvedValue(null);
      try {
        const existResult = await userService.getUserByEmail(userTestDto.email);
        expect(existResult).toEqual(null);
      } catch (error) {
        throw error;
      }
    });

    it('Should sign up successfully', async () => {
      jest.spyOn(AuthService.prototype, 'signUp').mockResolvedValue(res);
      try {
        const result = await service.signUp(userTestDto);
        expect(result).toEqual(res);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('sign-in', () => {
    const signInDto = {
      email: 'falguni@gmail.com',
      password: 'password',
    };

    const user = {
      id: 1,
      name: 'falguni',
      email: 'falguni@gmail.com',
      password: 'password',
      created_at: new Date('2024-03-21T07:02:29.713Z'),
      updated_at: new Date('2024-03-21T08:47:45.699Z'),
      role: Roles.USER,
    };

    const signedInRes = {
      statusCode: HttpStatus.OK,
      message: 'You have signed in successfully',
      data: {
        user: {
          id: 1,
          name: 'falguni',
          email: 'falguni@gmail.com',
          password: 'password',
          created_at: new Date('2024-03-21T07:02:29.713Z'),
          updated_at: new Date('2024-03-21T08:47:45.699Z'),
          role: Roles.USER,
        },
        token: 'testToken',
      },
    };

    it('Email should be exist', async () => {
      jest
        .spyOn(UsersService.prototype, 'getUserByEmail')
        .mockResolvedValue(user);
      try {
        const existResult = await userService.getUserByEmail(signInDto.email);
        expect(existResult).toEqual(user);
      } catch (error) {
        throw error;
      }
    });

    it('Should sign in successfully', async () => {
      jest
        .spyOn(AuthService.prototype, 'signIn')
        .mockResolvedValue(signedInRes);
      try {
        const signInResult = await service.signIn(signInDto);
        expect(signInResult).toEqual(signedInRes);
      } catch (error) {
        throw error;
      }
    });
  });
});
