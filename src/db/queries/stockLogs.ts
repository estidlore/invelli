import { db } from "@/db/config";
import { StockLog, stockLogs } from "@/db/schema";

const getStockLogs = async (): Promise<StockLog[]> => {
  return await db.select().from(stockLogs);
};

export { getStockLogs };
