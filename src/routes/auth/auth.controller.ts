import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthGuard } from "@/guards";
import { GetUser } from "@/decorators";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("me")
  @UseGuards(AuthGuard)
  getMe(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post("register")
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
