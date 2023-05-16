import { RawLedger } from 'src/finance/entities/raw-ledger.entity';

export interface RawLedgerRepositoryPort {
  insertRawLedgerData(record: RawLedger): Promise<void>;
  getRawLedger(id: string): Promise<RawLedger>;
}
