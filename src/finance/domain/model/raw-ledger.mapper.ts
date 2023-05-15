import { Injectable } from '@nestjs/common';
import { RawLedgerResponseDto } from 'src/finance/dto/response/RawLedger.response.dto';
import { RawLedger } from 'src/finance/entities/raw-ledger.entity';
import { RawLedgerEntity } from './raw-ledger.entity';

@Injectable()
export class RawLedgerMapper {
  toDomain(record: RawLedger): RawLedgerEntity {
    const entity = new RawLedgerEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        userId: record.userId,
        companyId: record.companyId,
        mappingInfo: record.mappingInfo,
        rawData: record.rawData,
      },
    });

    return entity;
  }

  toPersistence(entity: RawLedgerEntity): RawLedger {
    const copy = entity.getPropsCopy();
    const record = new RawLedger();
    record.id = copy.id;
    record.userId = copy.userId;
    record.companyId = copy.companyId;
    record.mappingInfo = copy.mappingInfo;
    record.rawData = copy.rawData;

    return record;
  }

  toResponse(entity: RawLedgerEntity): RawLedgerResponseDto {
    const copy = entity.getPropsCopy();
    const response = {
      id: copy.id,
      userId: copy.userId,
      companyId: copy.companyId,
    };

    return response;
  }
}
