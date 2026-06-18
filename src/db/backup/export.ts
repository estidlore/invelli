import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

import { getItems, getTransactionItems, getTransactions } from "@/db/queries";
import { dateToFileName } from "@/utils";

import type { Backup } from "./types";

const DB_VERSION = 2;

const exportToJson = async (): Promise<void> => {
  const date = new Date();
  const fileName = `invelli_backup_${dateToFileName(date)}.txt`;
  const file = new File(Paths.cache, fileName);

  const items = await getItems();
  const transactionItems = await getTransactionItems();
  const transactions = await getTransactions();

  const backup: Backup = {
    metadata: {
      exportedAt: date.toISOString(),
      version: DB_VERSION,
    },
    payload: {
      items,
      transactionItems,
      transactions,
    },
  };
  file.write(JSON.stringify(backup));

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, { mimeType: "text/plain" });
  }
};

export { exportToJson };
