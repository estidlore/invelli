import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { any, has, isObj, vals } from "litus";

import { db } from "@/db/config";
import type { Item, StockLog } from "@/db/schema";
import { items, stockLogs } from "@/db/schema";

import type { Backup, BackupPayload } from "./types";

const parseJsonBackup = (json: string): Backup => {
  const backup = JSON.parse(json);
  if (!isObj(backup) || !has(backup, "metadata", "payload")) {
    throw new Error("Backup missing metadata or payload");
  }
  const { metadata, payload } = backup;
  if (!isObj(metadata) || !has(metadata, "exportedAt", "version")) {
    throw new Error("Backup metadata missing exportedAt or version");
  }
  if (!isObj(payload) || !has(payload, "items", "stockLogs")) {
    throw new Error("Backup payload missing items or stockLogs");
  }
  if (any(vals(payload), (table) => !Array.isArray(table))) {
    throw new Error("Backup payload tables must be arrays");
  }
  return backup as Backup;
};

const insertBackupTransaction = async (payload: BackupPayload): Promise<void> => {
  const { items: itemsData, stockLogs: stockLogsData } = payload;

  await db.transaction(async (tx) => {
    if (itemsData.length > 0) {
      await tx
        .insert(items)
        .values(itemsData as Item[])
        .onConflictDoNothing();
    }
    if (stockLogsData.length > 0) {
      await tx
        .insert(stockLogs)
        .values(stockLogsData as StockLog[])
        .onConflictDoNothing();
    }
  });
};

const importFromJson = async (): Promise<void> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["application/json", "text/plain"],
  });
  if (result.canceled || !result.assets) {
    return;
  }

  const file = new File(result.assets[0].uri);
  const content = await file.text();
  const backup = parseJsonBackup(content);

  await insertBackupTransaction(backup.payload);
};

export { importFromJson };
