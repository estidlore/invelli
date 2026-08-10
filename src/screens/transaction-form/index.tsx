import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useTransition } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import {
  Alert,
  Button,
  Input,
  List,
  QueryFallback,
  Screen,
  Select,
  Text,
  useToast,
} from "@/components";
import { useForm } from "@/core/form";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import type { Transaction } from "@/db";
import {
  TX_REASONS,
  TX_TYPE_BY_REASON,
  getTransaction,
  getTransactionItems,
  updateTransaction,
} from "@/db";
import { hasEnoughStock, logError, nullableText } from "@/utils";

import { TransactionItem } from "./TransactionItem";
import { schema } from "./schema";
import { styles } from "./styles";
import { translations } from "./translations";

const TransactionFormscreen = (): React.JSX.Element => {
  const { id: txId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: txItems, error: txItemsError } = useLiveQuery(
    getTransactionItems({ isDetailed: true, transactionId: txId }),
    [txId],
  );
  const [values, setValues] = useState({
    notes: "",
    reason: "SALE" as Transaction["reason"],
  });
  const tx = {
    reason: values.reason,
    status: "DRAFT" as Transaction["status"],
    type: TX_TYPE_BY_REASON[values.reason],
  };

  const t = useTranslation(translations);
  const showToast = useToast();
  const txReasonOptions = TX_REASONS.map((el) => ({ text: t.map.reason[el], value: el }));

  const { getFieldProps, isSubmitting, submit } = useForm({
    onAutoSave: async (values) => {
      await updateTransaction(txId, {
        notes: nullableText(values.notes),
        reason: values.reason,
        type: TX_TYPE_BY_REASON[values.reason],
      });
      showToast(t.transaction.updated);
    },
    onSubmit: async (values) => {
      await updateTransaction(txId, {
        notes: nullableText(values.notes),
        reason: values.reason,
        type: TX_TYPE_BY_REASON[values.reason],
      });
      showToast(t.transaction.updated);
      handleBack();
    },
    schema,
    setValues,
    values,
  });

  useEffect(() => {
    startTransition(async () => {
      const tx = await getTransaction({ id: txId });
      if (tx) {
        setValues({
          notes: tx.notes ?? "",
          reason: tx.reason,
        });
      }
    });
  }, [txId, setValues]);

  const handleBack = (): void => {
    router.dismissTo({
      params: { id: txId },
      pathname: "/transactions/[id]",
    });
  };

  if (isPending) {
    return (
      <Screen goBack={handleBack} title={t.transaction.add}>
        <QueryFallback isPending={isPending} />
      </Screen>
    );
  }

  const handleAdd = (): void => {
    router.push({
      params: { id: txId },
      pathname: "/transactions/[id]/add-items",
    });
  };

  const handleSubmit = (): void => {
    submit().catch((err) => {
      logError(err);
      showToast(t.transaction.updateError, "error");
    });
  };

  const reasonProps = getFieldProps<Transaction["reason"]>("reason");
  const hasStock = hasEnoughStock(
    tx,
    txItems.map((el) => ({ quantity: el.quantity, stock: el.item.quantity })),
  );

  return (
    <Screen goBack={handleBack} title={t.transaction.add}>
      <View style={[commonStyles.column, commonStyles.grow]}>
        <Select
          {...reasonProps}
          label={t.label.reason}
          options={txReasonOptions}
          style={styles.input}
        />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Input
            {...getFieldProps("notes")}
            label={t.label.notes}
            maxLength={500}
            style={styles.input}
          />
        </KeyboardAvoidingView>

        <View style={commonStyles.row}>
          <Text style={commonStyles.grow} type={"subtitle"}>
            {t.items.title}
          </Text>
          <Button color={"primary"} icon={"plus"} onPress={handleAdd} variant={"solid"}>
            {t.items.add}
          </Button>
        </View>

        <Alert hide={hasStock} type={"warning"}>
          {t.items.insufficientStock}
        </Alert>

        <List
          data={txItems}
          error={txItemsError}
          errorMsg={t.items.loadError}
          renderItem={({ item }) => <TransactionItem data={item} key={item.id} tx={tx} />}
        />
      </View>

      <Button
        color={"primary"}
        disabled={isSubmitting}
        icon={"check"}
        iconSize={32}
        onPress={handleSubmit}
        style={commonStyles.floatingBtn}
        variant={"solid"}
      />
    </Screen>
  );
};

export { TransactionFormscreen };
