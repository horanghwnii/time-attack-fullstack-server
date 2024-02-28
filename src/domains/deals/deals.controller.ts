import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Private } from 'src/decorators/private.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { CreateProductDto, UpdateProductDto } from './deals.dto';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post('create')
  @Private('user')
  async createProduct(@DUser() user: User, @Body() dto: CreateProductDto) {
    const deals = await this.dealsService.createProduct(user.id, dto);

    return deals;
  }

  @Get(':dealId')
  async findUniqueDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    const deal = await this.dealsService.findUniqueDeal(dealId);

    return deal;
  }

  @Put(':dealId/edit')
  @Private('user')
  async updateDeal(
    @Param('dealId', ParseIntPipe) dealId: number,
    @Body() dto: UpdateProductDto,
  ) {
    const updatedDeal = await this.dealsService.updateDeal(dealId, dto);

    return updatedDeal;
  }

  @Delete(':dealId')
  async deleteDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    const deletedDealId = await this.dealsService.deleteDeal(dealId);

    return deletedDealId;
  }
}
