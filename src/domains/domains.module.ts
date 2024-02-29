import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DealsModule } from './deals/deals.module';
import { MainModule } from './main/main.module';
import { MyModule } from './my/my.module';

@Module({
  imports: [AuthModule, DealsModule, MainModule, MyModule],
})
export class DomainsModule {}
