import { randomUUID } from "expo-crypto";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { any, get, has, isObj, vals } from "litus";

import { db } from "@/db/config";
import type { Item, NewItem } from "@/db/schema";
import { items } from "@/db/schema";

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
  if (!isObj(payload) || !has(payload, "items")) {
    throw new Error("Backup payload missing tables");
  }
  if (any(vals(payload), (table) => !Array.isArray(table))) {
    throw new Error("Backup payload tables must be arrays");
  }
  return backup as Backup;
};

const processPayload = (payload: BackupPayload): BackupPayload => {
  const { items: rawItems } = payload;
  const items: NewItem[] = [];

  for (let i = 0; i < rawItems.length; i++) {
    const item = rawItems[i];
    if (!isObj(item) || !has(item, "costPrice", "name", "sellPrice")) {
      continue;
    }

    items.push({
      costPrice: Number(item.costPrice),
      createdAt: get(item, "createdAt"),
      id: get(item, "id") ?? randomUUID(),
      name: String(item.name),
      quantity: get(item, "quantity"),
      sellPrice: Number(item.sellPrice),
      sku: get(item, "sku"),
      updatedAt: get(item, "updatedAt"),
    });
  }

  return { items };
};

const insertBackupTransaction = async (payload: BackupPayload): Promise<void> => {
  const { items: itemsData } = payload;

  await db.transaction(async (tx) => {
    if (itemsData.length > 0) {
      await tx
        .insert(items)
        .values(itemsData as Item[])
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
