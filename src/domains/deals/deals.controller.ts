import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Private } from 'src/decorators/private.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post('create')
  @Private('user')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @DUser() user: User,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: any,
  ) {
    const data = {
      imageSrc: image,
      name: dto.name,
      description: dto.description,
      address: dto.address,
      price: Number(dto.price),
    };

    const result = this.dealsService.createDeal(user.id, data);

    return result;
  }

  @Get(':dealId')
  async findUniqueDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    const deal = await this.dealsService.findUniqueDeal(dealId);

    return deal;
  }

  @Post(':dealId/edit')
  @Private('user')
  @UseInterceptors(FileInterceptor('image'))
  async updateDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: any,
  ) {
    const data = {
      imageSrc: image,
      name: dto.name,
      description: dto.description,
      address: dto.address,
      price: Number(dto.price),
    };

    const result = this.dealsService.updateDeal(dealId, user.id, data); //서비스에 보내줌

    return result;
  }

  @Delete(':dealId')
  async deleteDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    const deletedDealId = await this.dealsService.deleteDeal(dealId);

    return deletedDealId;
  }
}
