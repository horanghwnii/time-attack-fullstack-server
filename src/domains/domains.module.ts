import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DealsModule } from './deals/deals.module';
import { MainModule } from './main/main.module';

@Module({
  imports: [AuthModule, DealsModule, MainModule],
})
export class DomainsModule {}
