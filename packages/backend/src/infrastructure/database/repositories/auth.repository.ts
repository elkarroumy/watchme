import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../core/entities/dtos/auth.dto';
import { User, UserMethods } from '../../../core/entities/user.entity';

@Injectable()
export default class AuthRepository implements UserMethods {
  public constructor(private readonly prisma: PrismaClient) {}

  public async create(data: UserDto): Promise<User> {
    return await this.prisma.user.create({
      data
    });
  }

  public async find(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  public async updateToken(id: string, token: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        refreshToken: token
      }
    });
  }
}
