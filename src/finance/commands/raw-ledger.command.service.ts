import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { CreateRawLedgerProps } from '../domain/model/raw-ledger.types';
import { RawLedgerEntity } from '../domain/model/raw-ledger.entity';
import { RawLedgerMapper } from '../domain/model/raw-ledger.mapper';
import { UpdateRawLedgerDto } from '../dto/request/update-raw-ledger.request.dto';
import { RawLedgerResponseDto } from '../dto/response/RawLedger.response.dto';
import { RawLedgerRepository } from '../repository/interfaces/raw-ledger.repository';
import { RawLedger } from 'src/finance/db/entities/raw-ledger.entity';

export class RawLedgerCommandService {
  private readonly logger = new Logger(RawLedgerCommandService.name);

  constructor(
    @Inject('RAW_LEDGER_REPOSITORY')
    private readonly rawLedgerRepository: RawLedgerRepository,
    @Inject('RAW_LEDGER_MAPPER')
    private readonly rawLedgerMapper: RawLedgerMapper,
  ) {
    this.logger.log('RawLedgerCommandService created');
  }

  async createRawLedger(props: CreateRawLedgerProps): Promise<void> {
    this.logger.log('RawLedgerCommandService.createRawLedger()', props);

    const entity = RawLedgerEntity.create(props);
    const record = this.rawLedgerMapper.toPersistence(entity);
    await this.rawLedgerRepository.save(record);
  }

  async updateRawLedger(id: string, props: UpdateRawLedgerDto): Promise<void> {
    this.logger.log('RawLedgerCommandService.updateRawLedger()', props);

    const rawLedgerRecord: RawLedger =
      await this.rawLedgerRepository.getRawLedger(id);

    if (!rawLedgerRecord) {
      throw new BadRequestException('RawLedger not found');
    }

    const rawLedgerEntity: RawLedgerEntity =
      this.rawLedgerMapper.toDomain(rawLedgerRecord);

    rawLedgerEntity.updateMappingInfo(props);

    const updatedRawLedgerRecord: RawLedger =
      this.rawLedgerMapper.toPersistence(rawLedgerEntity);

    await this.rawLedgerRepository.save(updatedRawLedgerRecord);
  }
}
