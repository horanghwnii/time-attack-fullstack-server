import { Injectable } from '@nestjs/common';
import { PrismaService } from './db/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllDeals() {
    const products = await this.prismaService.product.findMany();

    return products;
  }
}
