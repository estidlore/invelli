import React, { useReducer } from "react";
import { TouchableOpacity, View } from "react-native";

import { Card, Icon, Text } from "components";
import { ItemDetails } from "views/modals/ItemDetails";

import { styles } from "./styles";
import type { ItemCardProps } from "./types";

const ItemCard = ({ item }: ItemCardProps): JSX.Element => {
  const { brand = "", code, name, price, quantity, unit } = item;

  const [showDetails, toggleDetails] = useReducer((val) => !val, false);

  return (
    <TouchableOpacity onPress={toggleDetails} style={styles.container}>
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
      <ItemDetails item={item} onClose={toggleDetails} visible={showDetails} />
    </TouchableOpacity>
  );
};

export { ItemCard };
