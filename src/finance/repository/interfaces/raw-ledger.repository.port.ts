import { RawLedger } from 'src/finance/db/entities/raw-ledger.entity';

export interface RawLedgerRepositoryPort {
  save(record: RawLedger): Promise<void>;
  getRawLedger(id: string): Promise<RawLedger>;
  delete(id: string): Promise<void>;
}
