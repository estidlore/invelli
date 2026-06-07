import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import * as schema from "./schema";

const DATABASE_NAME = "inventory.db";
const expo = openDatabaseSync(DATABASE_NAME, { enableChangeListener: true });
const db = drizzle(expo, { schema });

export { db };
