import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useTransition } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { Button, FloatingButton, Input, QueryFallback, Screen, Text, useToast } from "@/components";
import { useForm } from "@/core/form";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { getItem, insertItem, updateItem } from "@/db";
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
  const t = useTranslation(translations);
  const showToast = useToast();

  const { getFieldProps, isSubmitting, submit } = useForm({
    onSubmit: async (values) => {
      if (isEditMode && params.id) {
        await updateItem(params.id, values);
        showToast(t.item.updated);
      } else {
        await insertItem(values);
        showToast(t.item.added);
      }

      router.back();
    },
    schema,
    setValues,
    values,
  });

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

  const handleScan = (): void => {
    router.navigate({ pathname: "/scanner" });
  };

  if (isPending) {
    return (
      <Screen goBack title={isEditMode ? t.item.edit : t.item.add}>
        <QueryFallback isPending={isPending} />
      </Screen>
    );
  }

  const handleSubmit = (): void => {
    submit().catch((err) => {
      logError(err);
      const errMsg = err?.message ?? String(err);

      if (errMsg.includes("UNIQUE constraint failed: items.code")) {
        showToast(t.item.codeInUse, "error");
      } else {
        showToast(isEditMode ? t.item.updateError : t.item.addError, "error");
      }
    });
  };

  return (
    <Screen goBack title={isEditMode ? t.item.edit : t.item.add}>
      <KeyboardAwareScrollView bottomOffset={16} keyboardShouldPersistTaps={"handled"}>
        <Text type={"small"}>{t.label.code}</Text>
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
      </KeyboardAwareScrollView>
      <FloatingButton disabled={isSubmitting} icon={"check"} onPress={handleSubmit} />
    </Screen>
  );
};

export { ItemFormScreen };
