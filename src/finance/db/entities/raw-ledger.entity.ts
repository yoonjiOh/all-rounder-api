import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { monotonicFactory, ULID } from 'ulid';

@Entity('rawLedger')
export class RawLedger {
  private ulid: ULID;

  constructor() {
    this.ulid = monotonicFactory();
  }

  @PrimaryColumn({
    name: 'id',
    comment:
      'Universally Unique Lexicographically Sortable Identifier of raw ledger',
  })
  id: string;

  // 나중에 user entity 와 연결
  @PrimaryColumn({
    name: 'userId',
    comment:
      'Universally Unique Lexicographically Sortable Identifier of userID',
  })
  userId: string;

  // 나중에 company entity 와 연결
  @PrimaryColumn({
    name: 'companyId',
    comment:
      'Universally Unique Lexicographically Sortable Identifier of companyId',
  })
  companyId: string;

  @Column({
    name: 'mappingInfo',
    type: 'jsonb',
    comment: 'user가 제출한 장부 field 명과 손익계산서 항목을 mapping 한 data',
  })
  mappingInfo: Record<string, any>;

  @Column({
    name: 'oldMappingInfo',
    type: 'jsonb',
    nullable: true,
    comment:
      'user가 제출한 장부 field 명과 손익계산서 항목을 mapping 한 old data',
  })
  oldMappingInfo: Record<string, any>;

  @Column({
    name: 'rawData',
    type: 'jsonb',
    comment: 'excel file 의 raw data',
  })
  rawData: Record<string, any>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    comment: 'raw ledger created date',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    comment: 'raw ledger updated date',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    comment: 'raw ledger deleted date',
  })
  deletedAt: Date;

  @BeforeInsert()
  generateUlid() {
    this.id = this.ulid();
  }
}
