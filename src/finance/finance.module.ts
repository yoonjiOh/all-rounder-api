import { Module } from '@nestjs/common';
import { financeControllers } from './finance.controller';

@Module({
  imports: [],
  controllers: [...financeControllers],
  providers: [],
})
export class FinanceModule {}
