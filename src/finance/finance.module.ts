import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawLedger } from './entities/raw-ledger.entity';
import { financeControllers } from './finance.controller';
import { FinanceProviders } from './finance.provider';

@Module({
  imports: [TypeOrmModule.forFeature([RawLedger])],
  controllers: [...financeControllers],
  providers: [...FinanceProviders],
})
export class FinanceModule {}
