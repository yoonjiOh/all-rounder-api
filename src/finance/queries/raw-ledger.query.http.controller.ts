import { Controller, Get, Inject, Param } from '@nestjs/common';
import { RawLedgerQueryService } from './raw-ledger.query.service';

@Controller('raw-ledger')
export class RawLedgerQueryHttpController {
  constructor(
    @Inject('RAW_LEDGER_QUERY_SERVICE')
    private readonly rawLedgerQueryService: RawLedgerQueryService,
  ) {}

  @Get('/:id')
  async getRawLedger(@Param('id') id: string) {
    return this.rawLedgerQueryService.getRawLedger(id);
  }
}
