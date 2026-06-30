import type { TransactionDetail, TransactionDetailItem } from "@/db";

interface TransactionItemProps {
  data: TransactionDetailItem;
  txType: TransactionDetail["type"];
}

export type { TransactionItemProps };
