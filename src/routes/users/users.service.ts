import { Injectable, NotFoundException } from "@nestjs/common";
import argon from "argon2";

import { PrismaService } from "@/prisma";

import { CreateUserDto, UpdateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await argon.hash(createUserDto.password);

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException("User not found");

    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException("User not found");

    if (updateUserDto.password) {
      updateUserDto.password = await argon.hash(updateUserDto.password);
    }

    await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id: id,
      },
    });

    return user;
  }
}
