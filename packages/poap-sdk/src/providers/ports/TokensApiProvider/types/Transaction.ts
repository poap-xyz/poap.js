export enum TransactionStatus {
  pending = 'pending',
  passed = 'passed',
  failed = 'failed',
  waiting = 'waiting_tx',
}

export interface Transaction {
  tx_hash: string;
  status: TransactionStatus;
}
