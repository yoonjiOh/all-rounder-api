import { AggregateID, Entity } from 'src/ddd/libs/entity.base';
import { IMappingInfo } from 'src/finance/types';
import { ulid } from 'ulid';
import { CreateRawLedgerProps, RawLedgerProps } from './raw-ledger.types';

export class RawLedgerEntity extends Entity<RawLedgerProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateRawLedgerProps): RawLedgerEntity {
    const id = ulid();
    // mappingInfo logic entity 에 추가
    const props: RawLedgerProps = {
      ...create,
      mappingInfo: this.createMappingInfo(create.rawData),
      oldMappaingInfo: {},
    };

    const RawLedgerInstance = new RawLedgerEntity({ id, props });
    return RawLedgerInstance;
  }

  static createMappingInfo(rawData: Record<string, any>): IMappingInfo {
    /*
      rawData 를 기반으로 mappingInfo 생성
      rawData 는 최소 1개 이상 데이터를 가지고 있다고 가정한다.
      TODO: 1개 안될 때 예외처리 필요함
      예: [ '날짜', '매출항목1', '매출항목2', '비용1', '비용2', '비용3' ]
    */

    if (rawData.length === 0) throw new Error('rawData is empty');

    const keys = Object.keys(rawData[0]);
    const revenueKeyword = ['매출', '수익', 'revenue', 'income', 'sales'];
    const producingCost = ['원가', '제조', '비용', 'producingCost'];
    const goodsSoldCost = ['구매', '재료', 'goodsSoldCost'];
    const sellingCost = ['판매', '수수료', '운반비', 'sellingCost'];
    const managementCost = [
      '관리',
      '급여',
      '임대료',
      '감가상각',
      '이자',
      'managementCost',
    ];

    const nonOperatingIncome = ['영업외수익', 'nonOperatingIncome'];
    const nonOperatingCost = ['영업외비용', 'nonOperatingCost'];
    const specialIncome = ['특별이익', 'specialIncome'];
    const specialCost = ['특별비용', 'specialCost'];
    const incomeTax = ['법인세', 'incomeTax'];

    return {
      revenue: keys.filter((key) =>
        revenueKeyword.some((word) => key.includes(word)),
      ),
      producingCost: keys.filter((key) =>
        producingCost.some((word) => key.includes(word)),
      ),
      goodsSoldCost: keys.filter((key) =>
        goodsSoldCost.some((word) => key.includes(word)),
      ),
      sellingCost: keys.filter((key) =>
        sellingCost.some((word) => key.includes(word)),
      ),
      managementCost: keys.filter((key) =>
        managementCost.some((word) => key.includes(word)),
      ),
      nonOperatingIncome: keys.filter((key) =>
        nonOperatingIncome.some((word) => key.includes(word)),
      ),
      nonOperatingCost: keys.filter((key) =>
        nonOperatingCost.some((word) => key.includes(word)),
      ),
      specialIncome: keys.filter((key) =>
        specialIncome.some((word) => key.includes(word)),
      ),
      specialCost: keys.filter((key) =>
        specialCost.some((word) => key.includes(word)),
      ),
      incomeTax: keys.filter((key) =>
        incomeTax.some((word) => key.includes(word)),
      ),
    };
  }

  updateMappingInfo(newMappingInfo: Record<string, any>): void {
    /*
      전달받은 mappingInfo 를 기반으로 rawData 의 mappingInfo 를 갈아 치운다. 
      validate 로직을 나중에 고도화 해야 할 것 같다.
      클라이언트에서 잘못해서 통채로 잘못된 데이터를 보내올 수 있기 때문에
      기존 mapping info 와 비교하거나, 한 번 정도는 기록을 해서 history 관리가 필요하다.
    */

    this.props.oldMappaingInfo = { ...this.props.mappingInfo };
    this.props.mappingInfo = newMappingInfo;
  }

  public validate(): void {
    console.log('validate');
  }
}
