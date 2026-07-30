import { and, desc, eq, like, or } from "drizzle-orm";
import { randomUUID } from "expo-crypto";
import type { SQLiteRunResult } from "expo-sqlite";

import { db } from "@/db/config";
import type { Item, NewItem } from "@/db/schema";
import { items } from "@/db/schema";
import { sanitizeDbItem } from "@/db/utils";

import type { SelectQuery } from "./types";

const deleteItem = async (id: string): Promise<SQLiteRunResult> => {
  return await db.delete(items).where(eq(items.id, id));
};

const getItem = async (id: string): Promise<Item | undefined> => {
  if (!id?.trim()) return undefined;

  return await db.query.items.findFirst({
    where: or(eq(items.id, id), eq(items.code, id)),
  });
};

const getItems = async (): Promise<Item[]> => {
  return await db.select().from(items);
};

const insertItem = async (item: Omit<NewItem, "id">): Promise<SQLiteRunResult> => {
  return await db.insert(items).values({ ...sanitizeDbItem(item), id: randomUUID() });
};

const searchItems = (searchText: string): SelectQuery<typeof items> => {
  const trimmed = searchText.trim();

  if (trimmed.length === 0) {
    return db.select().from(items).orderBy(desc(items.updatedAt)).limit(20) as SelectQuery<
      typeof items
    >;
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordMatchConditions = words.map((word) =>
    or(like(items.name, `%${word}%`), like(items.code, `%${word}%`)),
  );
  const textMatchCondition = and(...wordMatchConditions);

  return db
    .select()
    .from(items)
    .where(textMatchCondition)
    .orderBy(desc(items.updatedAt))
    .limit(20) as SelectQuery<typeof items>;
};

const updateItem = async (id: string, data: Partial<NewItem>): Promise<SQLiteRunResult> => {
  return await db.update(items).set(sanitizeDbItem(data)).where(eq(items.id, id));
};

export { deleteItem, getItem, getItems, insertItem, searchItems, updateItem };
