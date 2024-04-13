import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { commonResponseDto, responseDataDto } from '../utils/response.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<commonResponseDto> {
    return await this.authService.signUp(CreateUserDto);
  }

  @Post('sing-in')
  async singIn(@Body() SignInDto: SignInDto): Promise<responseDataDto> {
    return await this.authService.signIn(SignInDto);
  }
}
