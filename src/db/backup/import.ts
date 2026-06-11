import { randomUUID } from "expo-crypto";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { any, get, has, isObj, randInt, vals } from "litus";

import { db } from "@/db/config";
import type { Item, StockLog } from "@/db/schema";
import { items, stockLogs } from "@/db/schema";
import { dateToString } from "@/utils";

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

const processPayload = (payload: BackupPayload): BackupPayload => {
  const { items: rawItems, stockLogs: rawStockLogs } = payload;
  const items: Item[] = [];
  const stockLogs: StockLog[] = [];

  const date = dateToString(new Date());
  for (let i = 0; i < rawItems.length; i++) {
    const item = rawItems[i];
    if (!isObj(item) || !has(item, "costPrice", "name", "sellPrice")) {
      continue;
    }

    items.push({
      costPrice: Number(item.costPrice),
      createdAt: get(item, "createdAt", date),
      id: get(item, "id", randomUUID()),
      name: String(item.name),
      quantity: get(item, "quantity", 0),
      sellPrice: Number(item.sellPrice),
      sku: String(get(item, "sku", randInt(1e6, 1e7 - 1))),
      updatedAt: get(item, "updatedAt", date),
    });
  }

  const stockLogTypes = ["adjustment", "restock", "sale"];
  for (let i = 0; i < rawStockLogs.length; i++) {
    const stockLog = rawStockLogs[i];
    if (
      !isObj(stockLog) ||
      !has(stockLog, "costPrice", "itemId", "quantityDelta", "sellPrice", "type")
    ) {
      continue;
    }

    const type = String(stockLog.type);
    stockLogs.push({
      costPrice: Number(stockLog.costPrice),
      createdAt: get(stockLog, "createdAt", date),
      id: get(stockLog, "id", randomUUID()),
      itemId: String(stockLog.itemId),
      quantityDelta: Number(stockLog.quantityDelta),
      sellPrice: Number(stockLog.sellPrice),
      type: (stockLogTypes.includes(type) ? type : "adjustment") as StockLog["type"],
    });
  }

  return { items, stockLogs };
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

  const payload = processPayload(backup.payload);
  await insertBackupTransaction(payload);
};

export { importFromJson };
