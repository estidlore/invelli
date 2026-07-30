import type { NewItem, NewTransaction, NewTransactionItem } from "@/db/schema";

interface BackupMetadata {
  exportedAt: string;
  version: number;
}

interface BackupPayload {
  items: NewItem[];
  transactionItems: NewTransactionItem[];
  transactions: NewTransaction[];
}

interface Backup {
  metadata: BackupMetadata;
  payload: BackupPayload;
}

export type { Backup, BackupMetadata, BackupPayload };
