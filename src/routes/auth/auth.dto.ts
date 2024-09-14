import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  displayName: string;
}
