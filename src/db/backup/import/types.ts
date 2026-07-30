import type { BackupMetadata } from "@/db/backup/types";

interface ItemV1 {
  costPrice: number;
  createdAt: string;
  id: string;
  name: string;
  quantity: number;
  sellPrice: number;
  sku?: string;
  updatedAt: string;
}

interface BackupPayloadV1 {
  items: ItemV1[];
}

interface ItemV2 extends Omit<ItemV1, "costPrice" | "sku"> {
  code: ItemV1["sku"];
  buyPrice: ItemV1["costPrice"];
}

interface TransactionV2 {
  createdAt: string;
  id: string;
  notes?: string;
  reason: "DAMAGE" | "FOUND" | "MISSING" | "PURCHASE_RETURN" | "PURCHASE" | "SALE_RETURN" | "SALE";
  status: "COMPLETE" | "DRAFT";
  type: "IN" | "OUT";
  updatedAt: string;
}

interface TransactionItemV2 {
  buyPrice?: number;
  id: string;
  quantity: number;
  sellPrice?: number;
  itemId: string;
  transactionId: string;
}

interface BackupPayloadV2 {
  items: ItemV2[];
  transactions: TransactionV2[];
  transactionItems: TransactionItemV2[];
}

interface UnknownBackup {
  metadata: BackupMetadata;
  payload: BackupPayloadV1 | BackupPayloadV2;
}

export type { BackupPayloadV1, BackupPayloadV2, UnknownBackup };
