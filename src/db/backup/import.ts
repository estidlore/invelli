import { randomUUID } from "expo-crypto";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { any, get, has, isObj, none, vals } from "litus";

import { DEFAULT_REASON_BY_TYPE, TX_REASONS, TX_TYPES } from "@/db/constants";
import { insertBackup } from "@/db/queries";
import type { InsertBackupData } from "@/db/queries";
import type { NewItem, NewTransaction, NewTransactionItem, Transaction } from "@/db/schema";

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
    if (
      !isObj(item) ||
      !has(item, "name", "sellPrice") ||
      none(["buyPrice", "costPrice"], (el) => has(item, el))
    ) {
      continue;
    }

    items.push({
      buyPrice: get(item, "buyPrice") ?? get(item, "costPrice"),
      createdAt: get(item, "createdAt"),
      id: get(item, "id") ?? randomUUID(),
      name: item.name as string,
      quantity: get(item, "quantity"),
      sellPrice: item.sellPrice as number,
      sku: get(item, "sku"),
      updatedAt: get(item, "updatedAt"),
    });
  }

  return items;
};

const sanitizeTransactions = (rawTransactions: unknown[] = []): NewTransaction[] => {
  const transactions: NewTransaction[] = [];
  for (let i = 0; i < rawTransactions.length; i++) {
    const transaction = rawTransactions[i];
    if (!isObj(transaction) || !has(transaction, "type")) {
      continue;
    }

    const txType = transaction.type as Transaction["type"];
    if (!TX_TYPES.includes(txType)) {
      continue;
    }
    const txReason = get(transaction, "reason") as Transaction["reason"];

    transactions.push({
      createdAt: get(transaction, "createdAt"),
      id: get(transaction, "id"),
      notes: get(transaction, "notes"),
      reason: TX_REASONS.includes(txReason) ? txReason : DEFAULT_REASON_BY_TYPE[txType],
      type: txType,
      updatedAt: get(transaction, "updatedAt"),
    });
  }

  return transactions;
};

const sanitizeTransactionItems = (rawTransactionItems: unknown[] = []): NewTransactionItem[] => {
  const transactionItems: NewTransactionItem[] = [];

  for (let i = 0; i < rawTransactionItems.length; i++) {
    const transactionItem = rawTransactionItems[i];
    if (!isObj(transactionItem) || !has(transactionItem, "itemId", "quantity", "transactionId")) {
      continue;
    }

    transactionItems.push({
      buyPrice: get(transactionItem, "buyPrice"),
      createdAt: get(transactionItem, "createdAt"),
      id: get(transactionItem, "id"),
      itemId: transactionItem.itemId as string,
      quantity: transactionItem.quantity as number,
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
