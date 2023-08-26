import React, { useCallback } from "react";
import { View } from "react-native";

import { BarcodeScanner, Button, Input, Modal } from "components";
import { useRealm } from "utils/db";
import { useField } from "utils/form";

import { styles } from "./styles";
import type { ItemFormProps } from "./types";

const ItemForm = ({
  item = {},
  onClose,
  onSave,
  visible
}: ItemFormProps): JSX.Element => {
  const [brand, setBrand] = useField("string", item.brand);
  const [code, setCode] = useField("string", item.code);
  const [cost, setCost] = useField("number", item.cost);
  const [name, setName] = useField("string", item.name);
  const [price, setPrice] = useField("number", item.price);
  const [quantity, setQuantity] = useField("number", item.quantity);
  const [unit, setUnit] = useField("string", item.unit);

  const db = useRealm();
  const handleSave = useCallback(() => {
    onSave?.({
      brand,
      code,
      cost: parseInt(cost),
      name,
      price: parseInt(price),
      quantity: parseInt(quantity),
      unit
    });
    onClose?.();
  }, [db, brand, code, cost, name, onClose, onSave, price, quantity, unit]);

  return (
    <Modal onClose={onClose} title={"Agregar artículo"} visible={visible}>
      <View style={[styles.row, styles.input]}>
        <BarcodeScanner onScan={setCode} />
        <Input
          onChange={setCode}
          placeholder={"Código"}
          style={styles.codeInput}
          value={code}
        />
      </View>
      <Input
        onChange={setBrand}
        placeholder={"Marca"}
        style={styles.input}
        value={brand}
      />
      <Input
        onChange={setCost}
        placeholder={"Costo"}
        style={styles.input}
        type={"numeric"}
        value={cost}
      />
      <Input
        onChange={setName}
        placeholder={"Nombre"}
        style={styles.input}
        value={name}
      />
      <Input
        onChange={setPrice}
        placeholder={"Precio"}
        style={styles.input}
        type={"numeric"}
        value={price}
      />
      <Input
        onChange={setQuantity}
        placeholder={"Cantidad"}
        style={styles.input}
        type={"numeric"}
        value={quantity}
      />
      <Input
        onChange={setUnit}
        placeholder={"Unidad (g)"}
        style={styles.input}
        value={unit}
      />
      <Button icon={"check"} onPress={handleSave}>
        {"Guardar"}
      </Button>
    </Modal>
  );
};

export { ItemForm };
