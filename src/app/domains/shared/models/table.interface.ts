export interface Table {
  processId: number;
  originNit: number;
  nameOriginator: string;
  originatorAccount: string;
  originatorIdentification: number;
  effectiveDate: string;
  transactionNumber: string;
  totalTransactionValue: number | string;
  nameFile: string;
  lotDescription: string;
}
