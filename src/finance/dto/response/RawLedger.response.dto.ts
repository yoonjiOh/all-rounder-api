import { Expose, Transform } from 'class-transformer';

export class RawLedgerResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  companyId: string;

  // TODO: return 값은 나중에 정하자
}
