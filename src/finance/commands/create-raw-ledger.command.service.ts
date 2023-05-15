import { Inject, Logger } from '@nestjs/common';
import { CreateRawLedgerProps } from '../domain/model/raw-ladger.types';
import { RawLedgerEntity } from '../domain/model/raw-ledger.entity';
import { RawLedgerMapper } from '../domain/model/raw-ledger.mapper';
import { RawLedgerRepository } from '../repository/interfaces/raw-ledger.repository';

export class CreateRawLedgerCommandService {
  private readonly logger = new Logger(CreateRawLedgerCommandService.name);

  constructor(
    @Inject('RAW_LEDGER_REPOSITORY')
    private readonly rawLedgerRepository: RawLedgerRepository,
    @Inject('RAW_LEDGER_MAPPER')
    private readonly rawLedgerMapper: RawLedgerMapper,
  ) {
    this.logger.log('CreateRawLedgerCommandService created');
  }

  async createRawLedger(props: CreateRawLedgerProps): Promise<void> {
    this.logger.log('CreateRawLedgerCommandService.createRawLedger()', props);

    const entity = RawLedgerEntity.create(props);
    const record = this.rawLedgerMapper.toPersistence(entity);
    await this.rawLedgerRepository.insertRawLedgerData(record);
  }
}
