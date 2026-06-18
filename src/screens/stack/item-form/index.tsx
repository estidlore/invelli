import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useTransition } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Button, Input, Text } from "@/components";
import { useForm } from "@/core/form";
import { useTranslation } from "@/core/language";
import { useScanStore } from "@/core/scanner";
import { useColors } from "@/core/theme";
import { deleteItem, findItem, insertItem, updateItem } from "@/db";
import { logError } from "@/utils";

import { itemFormSchema } from "./schema";
import { styles } from "./styles";
import { translations } from "./translations";

const ItemFormScreen = (): React.JSX.Element => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const isEditMode = !!params.id;
  const [isPending, startTransition] = useTransition();
  const { scannedBarcode } = useScanStore();

  const colors = useColors();
  const t = useTranslation(translations);

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
        router.back();
      })
      .catch(logError);
  };

  const { getFieldProps, isSubmitting, setValues, submit } = useForm({
    initialValues: {
      costPrice: "0",
      name: "",
      quantity: "0",
      sellPrice: "0",
      sku: "",
    },
    onSubmit: async (values) => {
      const data = {
        costPrice: parseFloat(values.costPrice),
        name: values.name,
        quantity: parseInt(values.quantity),
        sellPrice: parseFloat(values.sellPrice),
        sku: values.sku.length == 0 ? null : values.sku,
      };

      if (isEditMode && params.id) {
        await updateItem(params.id, data);
      } else {
        await insertItem(data);
      }

      router.back();
    },
    schema: itemFormSchema,
  });

  const handleSubmit = (): void => {
    submit().catch(logError);
  };

  useEffect(() => {
    if (isEditMode) {
      startTransition(async () => {
        if (!params.id) return;
        const itemRecord = await findItem(params.id);
        if (itemRecord) {
          setValues({
            costPrice: itemRecord.costPrice.toString(),
            name: itemRecord.name,
            quantity: itemRecord.quantity.toString(),
            sellPrice: itemRecord.sellPrice.toString(),
            sku: itemRecord.sku ?? "",
          });
        }
      });
    }
  }, [isEditMode, params.id, setValues]);

  useEffect(() => {
    if (scannedBarcode) {
      setValues((prev) => ({ ...prev, sku: scannedBarcode }));
    }
  }, [scannedBarcode, setValues]);

  if (isPending) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Text type={"title"}>{isEditMode ? t.editItem : t.addItem}</Text>
        <Button icon={"xmark"} onPress={handleBack} />
      </View>

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoiding}
        >
          <View style={styles.skuRow}>
            <Button icon={"qrcode"} onPress={handleScan} />
            <Input
              placeholder={t.placeholder.sku}
              style={styles.skuInput}
              {...getFieldProps("sku")}
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
            placeholder={"5"}
            style={styles.input}
            type={"numeric"}
            {...getFieldProps("quantity")}
          />
          <Input
            label={t.label.costPrice}
            placeholder={"10.00"}
            style={styles.input}
            type={"numeric"}
            {...getFieldProps("costPrice")}
          />
          <Input
            label={t.label.sellPrice}
            placeholder={"10.00"}
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
            style={[styles.save, { backgroundColor: colors.primary }]}
          >
            {t.save}
          </Button>
          {isEditMode && <Button icon={"trash"} onPress={handleDelete} />}
        </View>
      </ScrollView>
    </>
  );
};

export { ItemFormScreen };
