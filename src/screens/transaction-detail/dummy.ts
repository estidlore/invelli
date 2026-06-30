import type { TransactionDetail } from "@/db";
import { dateTimeString } from "@/utils";

const dummyTransaction: TransactionDetail = {
  createdAt: dateTimeString(new Date()),
  id: "abcd-efgh-tx-1",
  notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  reason: "SALE",
  transactionItems: [
    {
      buyPrice: 4500,
      createdAt: dateTimeString(new Date()),
      id: "abcd-efgh-tx-item-1",
      item: {
        name: "Gaseosa CocaCola 1.5L",
        sku: "1234567890",
      },
      itemId: "abcd-efgh-item-1",
      quantity: 10,
      sellPrice: 6000,
      transactionId: "abcd-efgh-tx-1",
      updatedAt: dateTimeString(new Date()),
    },
    {
      buyPrice: 8000,
      createdAt: dateTimeString(new Date()),
      id: "abcd-efgh-tx-item-2",
      item: {
        name: "Gaseosa CocaCola 3L",
        sku: "1234567890",
      },
      itemId: "abcd-efgh-item-2",
      quantity: 10,
      sellPrice: 11000,
      transactionId: "abcd-efgh-tx-1",
      updatedAt: dateTimeString(new Date()),
    },
  ],
  type: "IN",
  updatedAt: dateTimeString(new Date()),
};

export { dummyTransaction };
