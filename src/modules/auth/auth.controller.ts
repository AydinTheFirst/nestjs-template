import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto, UsersService } from '../users';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { GoogleService } from './google.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly googleService: GoogleService,
  ) {}

  @Post('oauth/google')
  async googleAuth(@Body('code') code: string) {
    return this.googleService.login(code);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
