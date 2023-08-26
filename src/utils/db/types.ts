import type { PropertySchema } from "realm";

import type { Item, Purchase, PurchaseItem, Sale, SaleItem } from "utils/types";

interface BackUp {
  items: Item[];
}

interface Collections {
  Item: Item;
  Purchase: Purchase;
  PurchaseItem: PurchaseItem;
  Sale: Sale;
  SaleItem: SaleItem;
}

type CollectionName = keyof Collections;

interface Schema<T extends CollectionName> {
  name: T;
  primaryKey: keyof Collections[T];
  properties: Record<keyof Collections[T], PropertySchema | string>;
}

export type { BackUp, Collections, CollectionName, Schema };
