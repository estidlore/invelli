interface BackupMetadata {
  exportedAt: string;
  version: number;
}

type BackupPayload = Record<"items", unknown[]>;

interface Backup {
  metadata: BackupMetadata;
  payload: BackupPayload;
}

export type { Backup, BackupMetadata, BackupPayload };
