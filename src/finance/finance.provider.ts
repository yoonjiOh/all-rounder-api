import { RawLedgerCommandService } from './commands/raw-ledger.command.service';
import { RawLedgerMapper } from './domain/model/raw-ledger.mapper';
import { RawLedgerQueryService } from './queries/raw-ledger.query.service';
import { RawLedgerRepository } from './repository/interfaces/raw-ledger.repository';

export const FinanceProviders = [
  {
    provide: 'RAW_LEDGER_COMMAND_SERVICE',
    useClass: RawLedgerCommandService,
  },
  {
    provide: 'RAW_LEDGER_QUERY_SERVICE',
    useClass: RawLedgerQueryService,
  },
  {
    provide: 'RAW_LEDGER_REPOSITORY',
    useClass: RawLedgerRepository,
  },
  {
    provide: 'RAW_LEDGER_MAPPER',
    useClass: RawLedgerMapper,
  },
];
