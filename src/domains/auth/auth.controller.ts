import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { DUser } from 'src/decorators/user.decorator';
import { LogInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  async getProfile(@DUser() user: User) {
    const profile = await this.authService.getProfile(user);

    return profile;
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const { accessToken } = await this.authService.signUp(dto);

    return accessToken;
  }

  @Post('log-in')
  async logIn(@Body() dto: LogInDto) {
    const { accessToken } = await this.authService.logIn(dto);

    return accessToken;
  }
}
