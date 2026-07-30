import { DB_VERSION } from "@/db/backup/constants";
import type { Backup } from "@/db/backup/types";

import type { BackupPayloadV1, BackupPayloadV2, UnknownBackup } from "./types";

const migrateV1 = (payload: BackupPayloadV1): BackupPayloadV2 => {
  const items = payload.items.map((el) => {
    const { costPrice, sku, ...rest } = el;
    return {
      ...rest,
      buyPrice: costPrice,
      code: sku,
    };
  });

  return { items, transactionItems: [], transactions: [] };
};

const backupMigration = (jsonBackup: UnknownBackup): Backup => {
  const { metadata, payload } = jsonBackup;
  let { version } = metadata;

  if (version === DB_VERSION) {
    return jsonBackup as Backup;
  }
  if (version > DB_VERSION) {
    throw new Error("App update required. This backup comes from a newer version");
  }
  let migrated: UnknownBackup["payload"] = payload;

  if (version === 1) {
    migrated = migrateV1(migrated as BackupPayloadV1);
  }

  return { metadata, payload: migrated as BackupPayloadV2 };
};

export { backupMigration };
