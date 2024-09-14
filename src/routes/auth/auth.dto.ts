import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  email: string;

  @IsString()
  displayName: string;
}
