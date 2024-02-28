import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { UpdateProductDto } from './deals.dto';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(userId: string, dto: any) {
    const { name, description, image, price, address } = dto;

    // 어디에 저장할 건지 + 파일명 + 파일 확장자 -> 경로

    const basePath = join(__dirname, '../../../public/images', nanoid());
    const fileName = nanoid();
    const fileExtension = image.originalName.split('.').slice(-1);
    const path = join(basePath, `${fileName}.${fileExtension}`);

    writeFile(path, dto.image.buffer);

    const product = await this.prismaService.deal.create({
      data: {
        name,
        description,
        imgSrc: `/images/${fileName}`,
        price,
        userId,
        address,
      },
    });

    return product;
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
      },
    });

    return deal;
  }

  async updateDeal(dealId: number, dto: UpdateProductDto) {
    const { name, description, price, address } = dto;

    const updatedDeal = await this.prismaService.deal.update({
      where: { id: dealId },
      data: { name, description, price, address },
    });

    return updatedDeal;
  }

  async deleteDeal(dealId: number) {
    await this.prismaService.deal.delete({ where: { id: dealId } });

    return dealId;
  }
}
