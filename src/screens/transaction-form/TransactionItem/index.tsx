import { useEffect, useReducer, useState } from "react";
import { View } from "react-native";

import { Card, ConfirmationButton, Icon, Input, Text, useToastStore } from "@/components";
import { useForm } from "@/core/form";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import { deleteTransactionItem, updateTransactionItem } from "@/db";
import { NUM_FORMATS, hasEnoughStock, logError } from "@/utils";

import { baseSchema, fullSchema } from "./schema";
import { translations } from "./translations";
import type { TransactionItemProps } from "./types";

const TransactionItem = ({ data, tx }: TransactionItemProps): React.JSX.Element => {
  const hasSellPrice = tx.reason === "SALE" || tx.reason === "SALE_RETURN";
  const [expand, toggleExpand] = useReducer((val) => !val, false);

  const [values, setValues] = useState({
    buyPrice: data.buyPrice ? NUM_FORMATS.FORM_PRICE.format(data.buyPrice) : "",
    quantity: NUM_FORMATS.FORM_QUANTITY.format(data.quantity),
    sellPrice: data.sellPrice ? NUM_FORMATS.FORM_PRICE.format(data.sellPrice) : "",
  });

  useEffect(() => {
    setValues((values) => ({
      ...values,
      quantity: NUM_FORMATS.FORM_QUANTITY.format(data.quantity),
    }));
  }, [data.quantity]);

  const colors = useColors();
  const t = useTranslation(translations);
  const showToast = useToastStore((state) => state.showToast);

  const { getFieldProps, isSubmitting } = useForm({
    onAutoSave: async (values) => {
      await updateTransactionItem(data.id, {
        buyPrice: parseFloat(values.buyPrice),
        quantity: parseFloat(values.quantity),
        sellPrice: hasSellPrice ? parseFloat(values.sellPrice) : data.sellPrice,
      });
    },
    onSubmit: async (values): Promise<void> => {
      await updateTransactionItem(data.id, {
        buyPrice: parseFloat(values.buyPrice),
        quantity: parseFloat(values.quantity),
        sellPrice: hasSellPrice ? parseFloat(values.sellPrice) : data.sellPrice,
      });
    },
    schema: hasSellPrice ? fullSchema : (baseSchema as typeof fullSchema),
    setValues,
    values,
  });

  const handleDelete = (): void => {
    deleteTransactionItem(data.id)
      .then(() => {
        showToast(t.itemDeleted);
      })
      .catch((err) => {
        showToast(t.itemDeleteError, "error");
        logError(err);
      });
  };

  const buyPriceProps = getFieldProps<string>("buyPrice");
  const sellPriceProps = getFieldProps<string>("sellPrice");
  const quantityProps = getFieldProps<string>("quantity");
  const enoughStock = hasEnoughStock(tx, [
    {
      quantity: parseFloat(values.quantity) ? parseFloat(values.quantity) : data.quantity,
      stock: data.item.quantity,
    },
  ]);

  return (
    <Card
      onPress={toggleExpand}
      style={[commonStyles.column, !enoughStock && { borderColor: colors.textWarning }]}
    >
      <View style={commonStyles.rowBetween}>
        <Text style={commonStyles.grow} type={"semibold"}>
          {data.item.name}
        </Text>
        <ConfirmationButton
          disabled={isSubmitting}
          icon={"trash"}
          onConfirm={handleDelete}
          title={t.deleteTransactionItem}
        />
      </View>

      <View style={commonStyles.row}>
        <Icon name={"qrcode"} />
        <Text style={commonStyles.grow}>{data.item.code ?? "-"}</Text>
        {!expand && (
          <Text style={commonStyles.grow}>
            {NUM_FORMATS.PRICE.format(hasSellPrice ? (data.sellPrice ?? 0) : (data.buyPrice ?? 0))}
          </Text>
        )}
      </View>
      <Input
        {...quantityProps}
        label={`${t.quantity} ( ${data.item.quantity} ${t.available} )`}
        min={1}
        type={"numeric"}
      />
      {expand && (
        <>
          <Input
            {...buyPriceProps}
            label={t.buyPrice}
            min={0}
            style={commonStyles.grow}
            type={"numeric"}
          />
          {hasSellPrice && (
            <Input
              {...sellPriceProps}
              label={t.sellPrice}
              min={0}
              style={commonStyles.grow}
              type={"numeric"}
            />
          )}
        </>
      )}
    </Card>
  );
};

export { TransactionItem };
