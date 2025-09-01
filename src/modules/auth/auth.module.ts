import { Module } from '@nestjs/common';

import { TokensService } from '../tokens';
import { UsersService } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleService } from './google.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokensService, UsersService, GoogleService],
})
export class AuthModule {}
