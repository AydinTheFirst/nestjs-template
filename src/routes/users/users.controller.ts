import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { AuthGuard, RolesGuard } from "@/guards";
import { Roles } from "@/decorators";
import { UserRole } from "@/enums";

@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post()
  @Roles([UserRole.Admin])
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  @Roles([UserRole.Admin])
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @Roles([UserRole.Admin])
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
