import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useTransition } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, View } from "react-native";

import { Button, Input, Select, Text, useToastStore } from "@/components";
import { useForm } from "@/core/form";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import type { Transaction } from "@/db";
import { TX_REASONS, TX_TYPE_BY_REASON, getTransaction, updateTransaction } from "@/db";
import { logError, nullableText } from "@/utils";

import { schema } from "./schema";
import { styles } from "./styles";
import { translations } from "./translations";

const TransactionFormscreen = (): React.JSX.Element => {
  const { id: txId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    notes: "",
    reason: "SALE" as Transaction["reason"],
  });

  const t = useTranslation(translations);
  const colors = useColors();
  const showToast = useToastStore((state) => state.showToast);
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
      router.back();
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
    router.back();
  };

  if (!txId) {
    return (
      <View style={commonStyles.center}>
        <Text>{t.transaction.notFound}</Text>
        <Button onPress={handleBack}>{t.goBack}</Button>
      </View>
    );
  }

  if (isPending) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  const handleSubmit = (): void => {
    submit().catch((err) => {
      logError(err);
      showToast(t.transaction.updateError, "error");
    });
  };

  const reasonProps = getFieldProps<Transaction["reason"]>("reason");

  return (
    <>
      <View style={commonStyles.header}>
        <Button icon={"back"} onPress={handleBack} />
        <Text type={"title"}>{t.transaction.add}</Text>
      </View>

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
    </>
  );
};

export { TransactionFormscreen };
