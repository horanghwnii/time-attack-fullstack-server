import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserDealsList(userId: string) {
    const deals = await this.prismaService.deal.findMany({ where: { userId } });

    return deals;
  }
}
