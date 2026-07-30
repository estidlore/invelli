import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import * as schema from "./schema";

const DATABASE_NAME = "inventory.db";
const expoDB = openDatabaseSync(DATABASE_NAME, { enableChangeListener: true });
expoDB.execSync("PRAGMA foreign_keys = ON;");
const db = drizzle(expoDB, { schema });

export { db };
