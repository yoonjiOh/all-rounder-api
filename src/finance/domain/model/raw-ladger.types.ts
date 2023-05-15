export interface CreateRawLedgerProps {
  userId: string;
  companyId: string;
  rawData: Record<string, any>;
}

export interface RawLedgerProps extends CreateRawLedgerProps {
  mappingInfo: Record<string, any>;
}
