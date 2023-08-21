import type { Item } from "utils/types";

interface Collections {
  Item: Item;
}

type CollectionName = keyof Collections;

interface Schema<T extends CollectionName> {
  name: T;
  primaryKey: keyof Collections[T];
  properties: Record<keyof Collections[T], string>;
}

export type { Collections, CollectionName, Schema };
