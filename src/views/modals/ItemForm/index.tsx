import React, { useCallback } from "react";
import { View } from "react-native";
import { useForm } from "ruxi";
import { number, object, string } from "yup";

import { BarcodeScanner, Button, Input, Modal } from "components";

import { useTranslation } from "./language";
import { styles } from "./styles";
import type { ItemFormProps } from "./types";

const itemSchema = object({
  brand: string(),
  code: string(),
  cost: number()
    .transform((value, original) => (original === "" ? undefined : value))
    .required()
    .typeError("cost must be a number")
    .positive()
    .integer(),
  name: string().required(),
  price: number()
    .transform((value, original) => (original === "" ? undefined : value))
    .required()
    .typeError("price must be a number")
    .positive()
    .integer(),
  quantity: number()
    .transform((value, original) => (original === "" ? undefined : value))
    .required()
    .typeError("quantity must be a number")
    .positive()
    .integer(),
  unit: string(),
});

const ItemForm = ({
  item = {},
  onClose,
  onSave,
  visible,
}: ItemFormProps): JSX.Element => {
  const t = useTranslation();
  const { fields, reset, submit } = useForm({
    initialValues: {
      brand: item.brand ?? "",
      code: item.code ?? "",
      cost: item.cost?.toString() ?? "",
      name: item.name ?? "",
      price: item.price?.toString() ?? "",
      quantity: item.quantity?.toString() ?? "",
      unit: item.unit ?? "",
    },
    onSubmit: (values): void => {
      onSave?.(values);
      onClose?.();
    },
    parser: {
      cost: parseInt,
      price: parseInt,
      quantity: parseInt,
    },
    validation: itemSchema,
  });

  const handleClose = useCallback(() => {
    onClose?.();
    reset();
  }, [reset]);

  return (
    <Modal onClose={handleClose} title={t.title(item)} visible={visible}>
      <View style={[styles.row, styles.input]}>
        <BarcodeScanner onScan={fields.code.onChange} />
        <Input {...fields.code} placeholder={t.code} style={styles.codeInput} />
      </View>
      <Input {...fields.brand} placeholder={t.brand} style={styles.input} />
      <Input
        {...fields.cost}
        placeholder={t.cost}
        style={styles.input}
        type={"numeric"}
      />
      <Input {...fields.name} placeholder={t.name} style={styles.input} />
      <Input
        {...fields.price}
        placeholder={t.price}
        style={styles.input}
        type={"numeric"}
      />
      <Input
        {...fields.quantity}
        placeholder={t.quantity}
        style={styles.input}
        type={"numeric"}
      />
      <Input {...fields.unit} placeholder={t.unit} style={styles.input} />
      <Button icon={"check"} onPress={submit}>
        {t.save}
      </Button>
    </Modal>
  );
};

export { ItemForm };
