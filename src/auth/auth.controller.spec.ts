import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';
import { Roles } from '../users/entities/user.entity';
import { User } from 'src/users/entities/User';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Mock the Repository class
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  /**Described for sign up */
  describe('Sign-Up', () => {
    const userTestDto = {
      name: 'falguni',
      email: 'falguni.suthar@gmail.com',
      password: 'password',
      role: Roles.USER,
    };

    const signUpResult = {
      statusCode: HttpStatus.CREATED,
      message: 'You have signed up successfully',
    };

    it('Should sign up successfully', async () => {
      jest
        .spyOn(authService, 'signUp')
        .mockImplementation(
          () => new Promise((resolve, reject) => resolve(signUpResult)),
        );
      try {
        expect(await authController.signUp(userTestDto)).toBe(signUpResult);
      } catch (error) {
        throw error;
      }
    });
  });

  /**Described for sign in */
  describe('Sign-In', () => {
    const signInDto = {
      email: 'falguni.suthar@gmail.com',
      password: 'password',
    };

    const signInResult = {
      statusCode: HttpStatus.OK,
      message: 'You have signed in successfully',
      data: {
        user: {
          id: 1,
          name: 'falguni',
          email: 'falguni@gmail.com',
          created_at: new Date('2024-03-21T07:02:29.713Z'),
          updated_at: new Date('2024-03-21T08:47:45.699Z'),
          role: 'admin',
        },
        token: 'testToken',
      },
    };

    it('Should signed in successfully', async () => {
      jest
        .spyOn(authService, 'signIn')
        .mockImplementation(
          () => new Promise((resolve, reject) => resolve(signInResult)),
        );
      try {
        expect(await authController.singIn(signInDto)).toBe(signInResult);
      } catch (error) {
        throw error;
      }
    });
  });
});
