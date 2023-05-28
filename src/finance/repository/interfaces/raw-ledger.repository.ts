import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RawLedger } from 'src/finance/db/entities/raw-ledger.entity';
import { DataSource, Repository } from 'typeorm';
import { RawLedgerRepositoryPort } from './raw-ledger.repository.port';

@Injectable()
export class RawLedgerRepository implements RawLedgerRepositoryPort {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(RawLedger)
    private rawLedgerRepository: Repository<RawLedger>,
  ) {}
  async save(record: RawLedger): Promise<void> {
    await this.rawLedgerRepository.save(record);
  }

  async getRawLedger(id: string): Promise<RawLedger> {
    return this.rawLedgerRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.rawLedgerRepository.softDelete({ id });
  }
}
