import React, { useCallback, useReducer } from "react";
import { TouchableOpacity, View } from "react-native";

import { Card, Icon, Text } from "components";
import { useRealm } from "utils/db";
import type { Item } from "utils/types";
import { ItemForm } from "views/modals/ItemForm";

import { styles } from "./styles";
import type { ItemCardProps } from "./types";

const ItemCard = ({ item }: ItemCardProps): JSX.Element => {
  const { brand = "", code, name, price, quantity, unit } = item;

  const [showEdit, toggleShowEdit] = useReducer((val) => !val, false);
  const db = useRealm();

  const handleEdit = useCallback(
    (data: Omit<Item, "id">) => {
      db.write(() => {
        Object.keys(data).forEach((el) => {
          const key = el as keyof Omit<Item, "id">;
          if (item[key] !== data[key]) {
            Object.assign(item, { [key]: data[key] });
          }
        });
      });
    },
    [db],
  );

  return (
    <TouchableOpacity onPress={toggleShowEdit} style={styles.container}>
      <Card title={`${name} ${brand}`.trimEnd()}>
        <View style={styles.row}>
          <View style={[styles.value, styles.row]}>
            <Icon name={"dollar-sign"} style={styles.icon} />
            <Text>{price}</Text>
          </View>
          <View style={[styles.value, styles.row]}>
            <Icon name={"hashtag"} style={styles.icon} />
            <Text>{quantity}</Text>
          </View>
          <View style={[styles.value, styles.row]}>
            <Icon name={"ruler"} style={styles.icon} />
            <Text>{unit ?? ""}</Text>
          </View>
          <View style={[styles.value, styles.row]}>
            <Icon name={"key"} style={styles.icon} />
            <Text>{code}</Text>
          </View>
        </View>
      </Card>
      <ItemForm
        item={item}
        onClose={toggleShowEdit}
        onSave={handleEdit}
        visible={showEdit}
      />
    </TouchableOpacity>
  );
};

export { ItemCard };
