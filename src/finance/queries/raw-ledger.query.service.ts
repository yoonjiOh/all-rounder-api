import { Inject, Logger } from '@nestjs/common';
import { RawLedgerMapper } from '../domain/model/raw-ledger.mapper';
import { RawLedgerResponseDto } from '../dto/response/RawLedger.response.dto';
import { RawLedgerRepository } from '../repository/interfaces/raw-ledger.repository';

export class RawLedgerQueryService {
  private readonly logger = new Logger(RawLedgerQueryService.name);

  constructor(
    @Inject('RAW_LEDGER_REPOSITORY')
    private readonly rawLedgerRepository: RawLedgerRepository,
    @Inject('RAW_LEDGER_MAPPER')
    private readonly rawLedgerMapper: RawLedgerMapper,
  ) {
    this.logger.log('CreateRawLedgerCommandService created');
  }

  async getRawLedger(id: string): Promise<RawLedgerResponseDto> {
    const record = await this.rawLedgerRepository.getRawLedger(id);
    const rawLedgerEntity = this.rawLedgerMapper.toDomain(record);

    return this.rawLedgerMapper.toResponse(rawLedgerEntity);
  }
}
