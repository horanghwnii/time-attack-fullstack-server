import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async getHello(): Promise<string> {
  //   return 'Hello World';
  // }

  @Get()
  async findAllDeals() {
    const deals = await this.appService.findAllDeals();
    console.log(deals);

    return deals;
  }
}
