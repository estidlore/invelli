import { and, desc, eq, like } from "drizzle-orm";
import { randomUUID } from "expo-crypto";
import type { SQLiteRunResult } from "expo-sqlite";

import { db } from "./config";
import type { Item } from "./schema";
import { items } from "./schema";
import type { SelectQuery } from "./types";

const deleteItem = async (id: string): Promise<SQLiteRunResult> => {
  return await db.delete(items).where(eq(items.id, id));
};

const findItem = async (id: string): Promise<Item | undefined> => {
  return await db.query.items.findFirst({
    where: eq(items.id, id),
  });
};

const insertItem = async (item: Omit<Item, "id">): Promise<SQLiteRunResult> => {
  return await db.insert(items).values({
    ...item,
    id: randomUUID(),
  });
};

const searchItems = (searchQuery: string): SelectQuery<typeof items> => {
  const words = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const conditions = words.map((word) => like(items.name, `%${word}%`));

  return db
    .select()
    .from(items)
    .where(and(...conditions))
    .orderBy(desc(items.updatedAt))
    .limit(20) as SelectQuery<typeof items>;
};

const updateItem = async (id: string, data: Partial<Item>): Promise<SQLiteRunResult> => {
  return await db.update(items).set(data).where(eq(items.id, id));
};

export { deleteItem, findItem, insertItem, searchItems, updateItem };
