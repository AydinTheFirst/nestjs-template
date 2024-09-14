import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  displayName: string;
}

export class UpdateUserDto extends CreateUserDto {}
