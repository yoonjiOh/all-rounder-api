import { Controller, Get, Inject, Param } from '@nestjs/common';
import { RawLedgerQueryService } from './raw-ledger.query.service';

@Controller()
export class RawLedgerQueryHttpController {
  constructor(
    @Inject('QUERY_RAW_LEDGER_COMMAND_SERVICE')
    private readonly rawLedgerQueryService: RawLedgerQueryService,
  ) {}

  @Get('/:id')
  async getRawLedger(@Param('id') id: string) {
    return this.rawLedgerQueryService.getRawLedger(id);
  }
}
