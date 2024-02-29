import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDeal(userId: string, dto: any) {
    const { name, description, imageSrc, price, address } = dto;

    const basePath = join(__dirname, '../../../public/images');
    const fileName = nanoid();
    const fileExtension = imageSrc.originalname.split('.').pop();
    const path = join(basePath, `${fileName}.${fileExtension}`);

    await writeFile(path, imageSrc.buffer);

    const deal = await this.prismaService.deal.create({
      data: {
        name,
        description,
        imgSrc: `/images/${fileName}.${fileExtension}`,
        price,
        userId,
        address,
      },
    });

    return deal;
  }

  async updateDeal(dealId: number, userId: string, dto: any) {
    const { name, description, imageSrc, price, address } = dto;

    const basePath = join(__dirname, '../../../public/images');
    const fileName = nanoid();
    const fileExtension = imageSrc.originalname.split('.').pop();
    const path = join(basePath, `${fileName}.${fileExtension}`);

    await writeFile(path, imageSrc.buffer);

    const updatedDeal = await this.prismaService.deal.update({
      where: { id: dealId },
      data: {
        name,
        description,
        imgSrc: `/images/${fileName}.${fileExtension}`,
        price,
        userId,
        address,
      },
    });

    return updatedDeal;
  }

  async findUniqueDeal(dealId: number) {
    const deal = await this.prismaService.deal.findUnique({
      where: { id: dealId },
      select: {
        name: true,
        description: true,
        imgSrc: true,
        id: true,
        price: true,
        userId: true,
        user: { select: { email: true } },
        address: true,
        views: true,
      },
    });

    await this.prismaService.deal.update({
      where: { id: dealId },
      data: { views: { increment: 1 } },
    });

    return deal;
  }

  async deleteDeal(dealId: number) {
    await this.prismaService.deal.delete({ where: { id: dealId } });

    return dealId;
  }
}
