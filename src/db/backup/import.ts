import { randomUUID } from "expo-crypto";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { any, get, has, isObj, vals } from "litus";

import { insertBackup } from "@/db/queries";
import type { InsertBackupData } from "@/db/queries";
import type { NewItem, NewTransaction, NewTransactionItem } from "@/db/schema";

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
    throw new Error("Backup payload missing items table");
  }
  if (any(vals(payload), (table) => !Array.isArray(table))) {
    throw new Error("Backup payload tables must be arrays");
  }
  return backup as Backup;
};

const sanitizeItems = (rawItems: unknown[]): NewItem[] => {
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

  return items;
};

const sanitizeTransactions = (rawTransactions: unknown[] = []): NewTransaction[] => {
  const transactions: NewTransaction[] = [];
  const transactionTypes: NewTransaction["type"][] = ["adjustment", "purchase", "sale"];

  for (let i = 0; i < rawTransactions.length; i++) {
    const transaction = rawTransactions[i];
    if (!isObj(transaction) || !has(transaction, "type")) {
      continue;
    }

    const type = String(transaction.type) as NewTransaction["type"];
    transactions.push({
      createdAt: get(transaction, "createdAt"),
      id: get(transaction, "id"),
      notes: get(transaction, "notes"),
      type: transactionTypes.includes(type) ? type : "adjustment",
      updatedAt: get(transaction, "updatedAt"),
    });
  }

  return transactions;
};

const sanitizeTransactionItems = (rawTransactionItems: unknown[] = []): NewTransactionItem[] => {
  const transactionItems: NewTransactionItem[] = [];

  for (let i = 0; i < rawTransactionItems.length; i++) {
    const transactionItem = rawTransactionItems[i];
    if (
      !isObj(transactionItem) ||
      !has(transactionItem, "itemId", "quantityDelta", "transactionId")
    ) {
      continue;
    }

    transactionItems.push({
      costPrice: get(transactionItem, "costPrice"),
      id: get(transactionItem, "id"),
      itemId: String(transactionItem.itemId),
      quantityDelta: Number(transactionItem.quantityDelta),
      sellPrice: get(transactionItem, "sellPrice"),
      transactionId: String(transactionItem.transactionId),
      updatedAt: get(transactionItem, "updatedAt"),
    });
  }

  return transactionItems;
};

const processPayload = (payload: BackupPayload): InsertBackupData => {
  const items = sanitizeItems(payload.items);
  const transactions = sanitizeTransactions(payload.transactions);
  const transactionItems = sanitizeTransactionItems(payload.transactionItems);

  return { items, transactionItems, transactions };
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
  await insertBackup(payload);
};

export { importFromJson };
