import { IsString } from "class-validator";

export class AuthDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RegisterDto extends AuthDto {
  @IsString()
  email: string;

  @IsString()
  displayName: string;
}
