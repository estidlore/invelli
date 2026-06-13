import { and, desc, eq, like, or } from "drizzle-orm";
import { randomUUID } from "expo-crypto";
import type { SQLiteRunResult } from "expo-sqlite";

import { db } from "@/db/config";
import type { Item } from "@/db/schema";
import { items } from "@/db/schema";

import type { SelectQuery } from "./types";

const deleteItem = async (id: string): Promise<SQLiteRunResult> => {
  return await db.delete(items).where(eq(items.id, id));
};

const findItem = async (id: string): Promise<Item | undefined> => {
  return await db.query.items.findFirst({
    where: eq(items.id, id),
  });
};

const getItems = async (): Promise<Item[]> => {
  return await db.select().from(items);
};

const insertItem = async (item: Omit<Item, "id">): Promise<SQLiteRunResult> => {
  return await db.insert(items).values({
    ...item,
    id: randomUUID(),
  });
};

const searchItems = (searchText: string): SelectQuery<typeof items> => {
  const trimmed = searchText.trim().toLowerCase();

  if (trimmed.length === 0) {
    return db.select().from(items).orderBy(desc(items.updatedAt)).limit(20) as SelectQuery<
      typeof items
    >;
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const conditions = words.map((word) => like(items.name, `%${word}%`));

  return db
    .select()
    .from(items)
    .where(or(like(items.sku, `%${trimmed}%`), and(...conditions)))
    .orderBy(desc(items.updatedAt))
    .limit(20) as SelectQuery<typeof items>;
};

const updateItem = async (id: string, data: Partial<Item>): Promise<SQLiteRunResult> => {
  return await db.update(items).set(data).where(eq(items.id, id));
};

export { deleteItem, findItem, getItems, insertItem, searchItems, updateItem };
