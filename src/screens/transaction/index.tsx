import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

import {
  Alert,
  Button,
  ConfirmationButton,
  List,
  QueryFallback,
  Screen,
  Text,
  useToast,
} from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import {
  COLOR_BY_TX_STATUS,
  completeTransaction,
  deleteTransaction,
  getTransaction,
  getTransactionItems,
  voidTransaction,
} from "@/db";
import { NUM_FORMATS, dateTimeString, hasEnoughStock, logError } from "@/utils";

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

  const t = useTranslation(translations);
  const colors = useColors();
  const showToast = useToast();

  if (txError || !tx) {
    return (
      <Screen goBack title={t.transaction.title}>
        <QueryFallback error={txError} errorMsg={t.transaction.loadError} isPending={!tx} />
      </Screen>
    );
  }

  const { status } = tx;

  const handleDelete = (): void => {
    deleteTransaction(id)
      .then(() => {
        router.back();
        showToast(t.transaction.deleted);
      })
      .catch((err) => {
        showToast(t.transaction.deleteError, "error");
        logError(err);
      });
  };

  const handleEdit = (): void => {
    router.push({
      params: { id },
      pathname: "/transactions/[id]/edit",
    });
  };

  const handleVoid = (): void => {
    voidTransaction(id)
      .then(() => {
        router.back();
        showToast(t.transaction.voided);
      })
      .catch((err) => {
        showToast(t.transaction.voidError, "error");
        logError(err);
      });
  };

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

  const sellTotal = txItems.reduce((acc, el) => acc + (el.sellPrice ?? 0) * el.quantity, 0);
  const buyTotal = txItems.reduce((acc, el) => acc + (el.buyPrice ?? 0) * el.quantity, 0);
  const hasStock = hasEnoughStock(
    tx,
    txItems.map((el) => ({ quantity: el.quantity, stock: el.item.quantity })),
  );

  return (
    <Screen goBack title={t.transaction.title}>
      <View style={[commonStyles.rowBetween, commonStyles.mb2]}>
        <View style={commonStyles.row}>
          {status === "DRAFT" && (
            <>
              <Button color={"primary"} icon={"pencil"} onPress={handleEdit} variant={"solid"}>
                {t.edit}
              </Button>
              <ConfirmationButton
                icon={"trash"}
                onConfirm={handleDelete}
                title={t.transaction.delete}
                variant={"outline"}
              />
            </>
          )}
          {status === "COMPLETE" && (
            <>
              <ConfirmationButton
                icon={"void"}
                onConfirm={handleVoid}
                title={t.transaction.void}
                variant={"outline"}
              />
              <Button icon={"copy"} variant={"outline"} />
            </>
          )}
        </View>
      </View>

      <View style={commonStyles.row}>
        <Text type={"semibold"}>{"ID"}</Text>
        <Text>{id}</Text>
      </View>

      <View style={[commonStyles.row, commonStyles.itemsStart, commonStyles.my]}>
        <View style={commonStyles.column}>
          <Text type={"semibold"}>{t.date}</Text>
          <Text type={"semibold"}>{t.status}</Text>
          <Text type={"semibold"}>{t.reason}</Text>
          {tx.notes && <Text type={"semibold"}>{t.notes}</Text>}
        </View>
        <View style={commonStyles.column}>
          <Text>{dateTimeString(new Date(tx.createdAt))}</Text>
          <Text color={COLOR_BY_TX_STATUS[status]}>{t.map.status[status]}</Text>
          <Text>{t.map.reason[tx.reason]}</Text>
          {tx.notes && <Text>{tx.notes}</Text>}
        </View>
      </View>

      <Alert hide={hasStock} type={"warning"}>
        {t.items.insufficientStock}
      </Alert>

      <View style={[commonStyles.row, styles.total, { borderBottomColor: colors.textDisabled }]}>
        <Text style={commonStyles.grow} type={"semibold"}>
          {t.items.title}
        </Text>
        <Text type={"semibold"}>{`${t.total}:`}</Text>
        <Text>{NUM_FORMATS.PRICE.format(sellTotal === 0 ? buyTotal : sellTotal)}</Text>
      </View>

      <List
        data={txItems}
        emptyMsg={t.items.empty}
        error={txItemsError}
        errorMsg={t.items.loadError}
        keyExtractor={(el) => el.id}
        renderItem={({ item }) => <TransactionItem data={item} tx={tx} />}
      />
      {status === "DRAFT" && txItems.length > 0 && hasStock && (
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
