import { useRouter } from "expo-router";
import { Share } from "react-native";

import { Button, ConfirmationButton, useToast } from "@/components";
import { useTranslation } from "@/core/language";
import { deleteTransaction, voidTransaction } from "@/db";
import { useBusinessStore } from "@/screens/settings/Business";
import { isSaleRelated, logError } from "@/utils";

import { generateTextReceipt } from "./generateReceipt";
import { translations } from "./translations";
import type { TransactionActionsProps } from "./types";

const TransactionActions = ({
  showReceipt,
  toggleReceipt,
  tx,
  txItems,
}: TransactionActionsProps): React.JSX.Element => {
  const router = useRouter();
  const t = useTranslation(translations);
  const showToast = useToast();

  const handleShareReceipt = (): void => {
    const businessInfo = useBusinessStore.getState().info;
    const receipt = generateTextReceipt(tx, txItems, t.receipt);
    const receiptType = tx.reason === "SALE" ? t.receipt.sale : t.receipt.return;
    Share.share({
      message: receipt,
      title: `${receiptType} - ${businessInfo.name}`,
    })
      .then((res) => {
        if (res.action === Share.sharedAction) {
          showToast(t.receipt.shared);
        }
      })
      .catch((err) => {
        logError(err);
        showToast(t.receipt.shareError, "error");
      });
  };

  if (showReceipt) {
    return (
      <>
        <Button icon={"list"} onPress={toggleReceipt} variant={"outline"} />
        <Button icon={"share"} onPress={handleShareReceipt} />
      </>
    );
  }

  const handleDelete = (): void => {
    deleteTransaction(tx.id)
      .then(() => {
        router.back();
        showToast(t.deleted);
      })
      .catch((err) => {
        showToast(t.deleteError, "error");
        logError(err);
      });
  };

  const handleEdit = (): void => {
    router.push({
      params: { id: tx.id },
      pathname: "/transactions/[id]/edit",
    });
  };

  const handleVoid = (): void => {
    voidTransaction(tx.id)
      .then(() => {
        router.back();
        showToast(t.voided);
      })
      .catch((err) => {
        showToast(t.voidError, "error");
        logError(err);
      });
  };

  return (
    <>
      {tx.status === "DRAFT" && (
        <Button color={"primary"} icon={"pencil"} onPress={handleEdit} variant={"solid"} />
      )}
      {isSaleRelated(tx.reason) && (
        <Button icon={"receipt"} onPress={toggleReceipt} variant={"outline"} />
      )}
      {tx.status === "DRAFT" && (
        <ConfirmationButton icon={"trash"} onConfirm={handleDelete} title={t.delete} />
      )}
      {tx.status === "COMPLETE" && (
        <ConfirmationButton icon={"void"} onConfirm={handleVoid} title={t.void} />
      )}
    </>
  );
};

export { TransactionActions };
