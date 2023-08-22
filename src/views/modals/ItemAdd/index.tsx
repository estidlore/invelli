import React, { useCallback, useState } from "react";
import { View } from "react-native";
import Realm from "realm";

import { BarcodeScanner, Button, Input, Modal } from "components";
import { useRealm } from "utils/db";
import type { Item } from "utils/types";

import { styles } from "./styles";
import type { ItemAddProps } from "./types";

const ItemAdd = ({ onClose, visible }: ItemAddProps): JSX.Element => {
  const [brand, setBrand] = useState("");
  const [code, setCode] = useState("");
  const [cost, setCost] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const db = useRealm();
  const handleAdd = useCallback(() => {
    const item: Item = {
      brand: brand,
      code,
      cost: parseInt(cost),
      id: new Realm.BSON.UUID(),
      name,
      price: parseInt(price),
      quantity: parseInt(quantity),
      unit
    };
    db.write(() => {
      db.create("Item", item);
    });
    onClose?.();
  }, [db, brand, code, cost, name, onClose, price, quantity, unit]);

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
      <Button icon={"check"} onPress={handleAdd}>
        {"Guardar"}
      </Button>
    </Modal>
  );
};

export { ItemAdd };
