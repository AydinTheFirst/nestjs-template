import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  username: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
