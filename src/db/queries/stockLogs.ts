import { db } from "@/db/config";
import type { StockLog } from "@/db/schema";
import { stockLogs } from "@/db/schema";

const getStockLogs = async (): Promise<StockLog[]> => {
  return await db.select().from(stockLogs);
};

export { getStockLogs };
