import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('image')
  // @Private('user')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @DUser() user: User,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: any,
  ) {
    // Multer는 파일을 다루는 라이브러리

    const data = {
      dto,
      image,
    };

    const result = this.dealsService.createProduct(user.id, data); //서비스에 보내줌

    return result;
  }

  // @Post('image')
  // @Private('user')
  // @UseInterceptors(FileInterceptor('blabla'))
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  //   // file 객체에 있는 버퍼 저장하기

  //   const data = file.buffer;
  //   const fileName = nanoid();
  //   const extension = file.originalname.split('.').slice(-1);
  //   const path = join(
  //     __dirname,
  //     '../../../public/images',
  //     `${fileName}.${extension}`,
  //   );

  //   await writeFile(path, data);

  //   return `/images/${fileName}.${extension}`;
  // }

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
