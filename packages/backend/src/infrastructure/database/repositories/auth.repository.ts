import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Auth } from '../../../core/repositories/auth.repository';
import { User } from '../../../core/repositories/dtos/auth.dto';

@Injectable()
export default class AuthRepository implements Auth {
  public constructor(private readonly prisma: PrismaClient) {}

  public async create(data: User) {
    return await this.prisma.user.create({
      data
    });
  }

  public async find(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  public async updateToken(id: string, token: string) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        refreshToken: token
      }
    });
  }
}
