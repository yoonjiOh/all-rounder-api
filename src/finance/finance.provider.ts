import { CreateRawLedgerCommandService } from './commands/create-raw-ledger.command.service';
import { RawLedgerMapper } from './domain/model/raw-ledger.mapper';
import { RawLedgerRepository } from './repository/interfaces/raw-ledger.repository';

export const FinanceProviders = [
  {
    provide: 'CREATE_RAW_LEDGER_COMMAND_SERVICE',
    useClass: CreateRawLedgerCommandService,
  },
  {
    provide: 'CREATE_RAW_LEDGER_COMMAND_SERVICE',
    useClass: CreateRawLedgerCommandService,
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
