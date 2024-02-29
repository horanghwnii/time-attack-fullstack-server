import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { Private } from 'src/decorators/private.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { DealsService } from './deals.service';

@Controller('my')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('deals')
  @Private('user')
  async getUserDealsList(@DUser() user: User) {
    const deals = await this.dealsService.getUserDealsList(user.id);

    return deals;
  }
}
