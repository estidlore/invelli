import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useReducer } from "react";
import { View } from "react-native";

import {
  Alert,
  ConfirmationButton,
  List,
  QueryFallback,
  Screen,
  Text,
  useToast,
} from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import { COLOR_BY_TX_STATUS, completeTransaction, getTransaction, getTransactionItems } from "@/db";
import { useBusinessStore } from "@/screens/settings/Business/store";
import { NUM_FORMATS, dateTimeString, hasEnoughStock, isSaleRelated, logError } from "@/utils";

import { TransactionActions } from "./TransactionActions";
import { TransactionItem } from "./TransactionItem";
import { styles } from "./styles";
import { translations } from "./translations";

const TransactionScreen = (): React.JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: tx, error: txError } = useLiveQuery(getTransaction({ id }), [id]);
  const { data: txItems, error: txItemsError } = useLiveQuery(
    getTransactionItems({ isDetailed: true, transactionId: id }),
    [id],
  );
  const router = useRouter();

  const [showReceipt, toggleReceipt] = useReducer((val) => !val, false);
  const businessInfo = useBusinessStore((state) => state.info);
  const t = useTranslation(translations);
  const colors = useColors();
  const showToast = useToast();

  const { hasStock, total } = useMemo(() => {
    if (!tx || !txItems) {
      return { hasStock: true, total: 0 };
    }

    let total = 0;
    if (isSaleRelated(tx.reason)) {
      for (const item of txItems) {
        total += (item.sellPrice ?? 0) * item.quantity;
      }
    } else {
      for (const item of txItems) {
        total += (item.buyPrice ?? 0) * item.quantity;
      }
    }

    const itemsStock = txItems.map((el) => ({ quantity: el.quantity, stock: el.item.quantity }));
    return { hasStock: hasEnoughStock(tx, itemsStock), total };
  }, [tx, txItems]);

  if (txError || !tx) {
    return (
      <Screen goBack title={t.transaction.title}>
        <QueryFallback error={txError} errorMsg={t.transaction.loadError} isPending={!tx} />
      </Screen>
    );
  }

  const { status } = tx;

  const handleComplete = (): void => {
    completeTransaction(id)
      .then(() => {
        showToast(t.transaction.completed);
        router.back();
      })
      .catch((err) => {
        logError(err);
        showToast(t.transaction.completeError, "error");
      });
  };

  return (
    <Screen
      actions={
        <TransactionActions
          showReceipt={showReceipt}
          toggleReceipt={toggleReceipt}
          tx={tx}
          txItems={txItems}
        />
      }
      goBack
      title={showReceipt ? t.receipt.title : t.transaction.title}
    >
      {showReceipt && (
        <View style={styles.businessInfo}>
          <Text type={"subtitle"}>{businessInfo.name}</Text>
          {businessInfo.taxId && <Text>{businessInfo.taxId}</Text>}
          {businessInfo.address && <Text>{businessInfo.address}</Text>}
          {businessInfo.phone && <Text>{businessInfo.phone}</Text>}
        </View>
      )}

      <View style={styles.txInfo}>
        <View style={commonStyles.column}>
          <Text type={"semibold"}>{t.reason}</Text>
          {!showReceipt && <Text type={"semibold"}>{t.status}</Text>}
          {tx.notes && <Text type={"semibold"}>{t.notes}</Text>}
        </View>
        <View style={styles.txInfoValues}>
          <View style={commonStyles.rowBetween}>
            <Text>{t.map.reason[tx.reason]}</Text>
            <Text>{dateTimeString(new Date(tx.createdAt))}</Text>
          </View>
          {!showReceipt && <Text color={COLOR_BY_TX_STATUS[status]}>{t.map.status[status]}</Text>}
          {tx.notes && <Text>{tx.notes}</Text>}
        </View>
      </View>

      <Alert hide={hasStock || showReceipt} type={"warning"}>
        {t.items.insufficientStock}
      </Alert>

      <View style={[styles.total, { borderBottomColor: colors.textDisabled }]}>
        <Text style={commonStyles.grow} type={"semibold"}>
          {t.items.title}
        </Text>
        <Text type={"semibold"}>{`${t.total}:`}</Text>
        <Text>{NUM_FORMATS.PRICE.format(total)}</Text>
      </View>

      <List
        ListFooterComponent={
          showReceipt ? <Text style={styles.footer}>{t.receipt.thanks}</Text> : null
        }
        contentContainerStyle={{ pointerEvents: showReceipt ? "none" : "auto" }}
        data={txItems}
        emptyMsg={t.items.empty}
        error={txItemsError}
        errorMsg={t.items.loadError}
        keyExtractor={(el) => el.id}
        renderItem={({ item }) => <TransactionItem data={item} tx={tx} />}
      />
      {status === "DRAFT" && txItems.length > 0 && hasStock && !showReceipt && (
        <ConfirmationButton
          color={"primary"}
          icon={"check"}
          onConfirm={handleComplete}
          title={t.transaction.complete}
          variant={"solid"}
        >
          {t.transaction.complete}
        </ConfirmationButton>
      )}
    </Screen>
  );
};

export { TransactionScreen };
