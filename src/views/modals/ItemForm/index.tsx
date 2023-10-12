import React, { useCallback } from "react";
import { View } from "react-native";
import { useForm } from "ruxi";
import { number, object, string } from "yup";

import { BarcodeScanner, Button, Input, Modal } from "components";

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
    <Modal onClose={handleClose} title={"Agregar artículo"} visible={visible}>
      <View style={[styles.row, styles.input]}>
        <BarcodeScanner onScan={fields.code.onChange} />
        <Input
          {...fields.code}
          placeholder={"Código"}
          style={styles.codeInput}
        />
      </View>
      <Input {...fields.brand} placeholder={"Marca"} style={styles.input} />
      <Input
        {...fields.cost}
        placeholder={"Costo"}
        style={styles.input}
        type={"numeric"}
      />
      <Input {...fields.name} placeholder={"Nombre"} style={styles.input} />
      <Input
        {...fields.price}
        placeholder={"Precio"}
        style={styles.input}
        type={"numeric"}
      />
      <Input
        {...fields.quantity}
        placeholder={"Cantidad"}
        style={styles.input}
        type={"numeric"}
      />
      <Input {...fields.unit} placeholder={"Unidad (g)"} style={styles.input} />
      <Button icon={"check"} onPress={submit}>
        {"Guardar"}
      </Button>
    </Modal>
  );
};

export { ItemForm };
