import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useTransition } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Button, ConfirmationButton, Input, Text, useToastStore } from "@/components";
import { useForm } from "@/core/form";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import { deleteItem, getItem, insertItem, updateItem } from "@/db";
import { useScanStore } from "@/screens/scanner/store";
import { NUM_FORMATS, logError } from "@/utils";

import { schema } from "./schema";
import { styles } from "./styles";
import { translations } from "./translations";

const ItemFormScreen = (): React.JSX.Element => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const isEditMode = !!params.id;
  const [isPending, startTransition] = useTransition();
  const scannedBarcode = useScanStore((state) => state.scannedBarcode);

  const [values, setValues] = useState({
    buyPrice: "",
    code: "",
    name: "",
    quantity: "",
    sellPrice: "",
  });
  const colors = useColors();
  const t = useTranslation(translations);
  const showToast = useToastStore((state) => state.showToast);

  const handleBack = (): void => {
    router.back();
  };

  const handleScan = (): void => {
    router.navigate({ pathname: "/scanner" });
  };

  const handleDelete = (): void => {
    if (!params.id) return;
    deleteItem(params.id)
      .then(() => {
        handleBack();
        showToast(t.toast.itemDeleted);
      })
      .catch((err) => {
        const errMsg = err?.message ?? String(err);

        if (errMsg.includes("FOREIGN KEY constraint failed")) {
          showToast(t.toast.itemInActiveTransactions, "error");
        } else {
          showToast(t.toast.itemDeleteError, "error");
        }
      });
  };

  const { getFieldProps, isSubmitting, submit } = useForm({
    onSubmit: async (values) => {
      const data = {
        buyPrice: parseFloat(values.buyPrice),
        code: values.code,
        name: values.name,
        quantity: parseFloat(values.quantity),
        sellPrice: parseFloat(values.sellPrice),
      };

      if (isEditMode && params.id) {
        await updateItem(params.id, data);
      } else {
        await insertItem(data);
      }

      router.back();
    },
    schema,
    setValues,
    values,
  });

  const handleSubmit = (): void => {
    submit()
      .then(() => {
        showToast(isEditMode ? t.toast.itemUpdated : t.toast.itemAdded);
      })
      .catch((err) => {
        showToast(isEditMode ? t.toast.itemUpdateError : t.toast.itemAddError, "error");
        logError(err);
      });
  };

  useEffect(() => {
    if (isEditMode) {
      startTransition(async () => {
        if (!params.id) return;
        const itemRecord = await getItem(params.id);
        if (itemRecord) {
          setValues({
            buyPrice: NUM_FORMATS.FORM_PRICE.format(itemRecord.buyPrice),
            code: itemRecord.code ?? "",
            name: itemRecord.name,
            quantity: NUM_FORMATS.FORM_QUANTITY.format(itemRecord.quantity),
            sellPrice: NUM_FORMATS.FORM_PRICE.format(itemRecord.sellPrice),
          });
        }
      });
    }
  }, [isEditMode, params.id, setValues]);

  useEffect(() => {
    if (scannedBarcode) {
      setValues((prev) => ({ ...prev, code: scannedBarcode }));
    }
  }, [scannedBarcode, setValues]);

  if (isPending) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  return (
    <>
      <View style={commonStyles.header}>
        <Text type={"title"}>{isEditMode ? t.editItem : t.addItem}</Text>
        <Button icon={"xmark"} onPress={handleBack} />
      </View>

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={commonStyles.grow}
        >
          <View style={styles.codeRow}>
            <Button icon={"qrcode"} onPress={handleScan} variant={"outline"} />
            <Input
              placeholder={t.placeholder.code}
              style={commonStyles.grow}
              {...getFieldProps("code")}
            />
          </View>
          <Input
            label={t.label.name}
            placeholder={t.placeholder.name}
            style={styles.input}
            {...getFieldProps("name")}
          />
          <Input
            label={t.label.quantity}
            min={0}
            placeholder={t.placeholder.number}
            style={styles.input}
            type={"numeric"}
            {...getFieldProps("quantity")}
          />
          <Input
            label={t.label.buyPrice}
            min={0}
            placeholder={t.placeholder.number}
            style={styles.input}
            type={"numeric"}
            {...getFieldProps("buyPrice")}
          />
          <Input
            label={t.label.sellPrice}
            min={0}
            placeholder={t.placeholder.number}
            style={styles.input}
            type={"numeric"}
            {...getFieldProps("sellPrice")}
          />
        </KeyboardAvoidingView>

        <View style={styles.actions}>
          <Button
            disabled={isSubmitting}
            icon={"check"}
            onPress={handleSubmit}
            style={[commonStyles.grow, { backgroundColor: colors.primary }]}
          >
            {t.save}
          </Button>
          {isEditMode && (
            <ConfirmationButton icon={"trash"} onConfirm={handleDelete} title={t.deleteItem} />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export { ItemFormScreen };
