import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateProductDto } from './deals.dto';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(userId: string, dto: CreateProductDto) {
    const { name, description, imgSrc, price } = dto;

    const product = await this.prismaService.product.create({
      data: { name, description, imgSrc, price, userId },
    });

    return product;
  }

  async findUniqueDeal(dealId: number) {
    const deal = await this.prismaService.product.findUnique({
      where: { id: dealId },
      select: {
        name: true,
        description: true,
        imgSrc: true,
        id: true,
        price: true,
        userId: true,
        user: { select: { email: true } },
      },
    });

    return deal;
  }
}
