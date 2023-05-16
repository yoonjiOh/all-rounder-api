import { RawLedgerCommandHttpController } from './commands/raw-ledger.command.http.controller';
import { RawLedgerQueryHttpController } from './queries/raw-ledger.query.http.controller';

export const financeControllers = [
  RawLedgerCommandHttpController,
  RawLedgerQueryHttpController,
];
