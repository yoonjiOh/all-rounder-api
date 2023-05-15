import { AggregateID, Entity } from 'src/ddd/libs/entity.base';
import { ulid } from 'ulid';
import { CreateRawLedgerProps, RawLedgerProps } from './raw-ladger.types';

export class RawLedgerEntity extends Entity<RawLedgerProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateRawLedgerProps): RawLedgerEntity {
    const id = ulid();

    // mappingInfo logic entity 에 추가
    const props: RawLedgerProps = {
      ...create,
      mappingInfo: {},
    };

    const RawLedgerInstance = new RawLedgerEntity({ id, props });
    return RawLedgerInstance;
  }

  public validate(): void {
    console.log('validate');
  }
}
