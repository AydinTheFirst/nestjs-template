import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { Roles } from "@/decorators";
import { UserRole } from "@/enums";
import { AuthGuard, RolesGuard } from "@/guards";

import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles([UserRole.Admin])
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles([UserRole.Admin])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @Roles([UserRole.Admin])
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  @Roles([UserRole.Admin])
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

  @Patch(":id")
  @Roles([UserRole.Admin])
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
