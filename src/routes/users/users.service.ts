import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { PrismaService } from "@/prisma";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  findAll = async () => {
    const users = await this.prisma.user.findMany();
    return users;
  };

  findOne = async (id: string) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  };

  create = async (createUserDto: CreateUserDto) => {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException("User not found");

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });

    return user;
  };

  remove = async (id: string) => {
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
  };
}
