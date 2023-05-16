// revenue: number; // 매출액
//   costOfSales: number; // 매출원가 (제품 제조비용 + 상품 구매비용)
//   producingCost: number; // 제품 제조비용
//   goodsSoldCost: number; // 상품 구매비용
//   grossProfit: number; // 매출총이익 (매출액 - 매출원가)
//   operatingExpenses: number; // 영업비용 (판매비와 관리비)
//   sellingCost: number; // 판매비 (판매수수료, 운반비, 판매관리비)
//   managementCost: number; // 관리비 (임대료, 급여, 감가상각비, 이자비용)
//   operatingIncome: number; // 영업이익 = 매출총이익 - 영업비용
//   nonOperatingIncome: number; // 영업외수익
//   nonOperatingCost: number; // 영업외비용
//   otherOperatingIncome: number; // 기타영업수익 = 영업외수익 - 영업외비용
//   preTaxNetIncome: number; // 법인세차감전순이익 = 영업이익 + 기타영업수익
//   specialIncome: number; // 특별이익
//   specialCost: number; // 특별비용
//   incomeTax: number; // 법인세비용
//   netIncome: number; // 당기순이익 = 법인세차감전순이익 - 법인세비용

export interface IMappingInfo {
  revenue: string[];
  producingCost: string[];
  goodsSoldCost: string[];
  sellingCost: string[];
  managementCost: string[];
  nonOperatingIncome: string[];
  nonOperatingCost: string[];
  specialIncome: string[];
  specialCost: string[];
  incomeTax: string[];
}
