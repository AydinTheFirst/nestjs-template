import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber("TR")
  phone: string;

  @IsString()
  username: string;
}

export class UpdateUserDto extends CreateUserDto {}
