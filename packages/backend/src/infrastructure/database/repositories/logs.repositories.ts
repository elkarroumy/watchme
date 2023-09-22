import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LogsDto } from '../../../common/types';

@Injectable()
export default class LogsRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public async create(data: LogsDto) {
    return await this.prisma.logs.create({
      data
    });
  }

  public async get() {
    return await this.prisma.logs.findMany();
  }
}
