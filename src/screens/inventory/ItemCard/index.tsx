import { useRouter } from "expo-router";
import { useReducer } from "react";
import { View } from "react-native";

import { Button, Card, Icon, Text } from "@/components";
import { createTranslations, useTranslation } from "@/core/language";

import { styles } from "./styles";
import type { ItemCardProps } from "./types";

const translations = createTranslations({
  ENG: {
    cost: "Cost",
    edit: "Edit",
    price: "Price",
    updatedAt: "Updated:",
  },
  SPA: {
    cost: "Costo",
    edit: "Editar",
    price: "Precio",
    updatedAt: "Actualizado:",
  },
});

const gridItemStyle = [styles.grid, styles.item];
const ItemCard = ({ item }: ItemCardProps): React.JSX.Element => {
  const { costPrice, quantity, name, sellPrice, sku, updatedAt } = item;
  const [expanded, toggleExpanded] = useReducer((val) => !val, false);
  const t = useTranslation(translations);
  const router = useRouter();

  const handleEdit = (): void => {
    router.push({
      params: {
        id: item.id,
      },
      pathname: "/item-form",
    });
  };

  return (
    <Card onPress={toggleExpanded} style={styles.card} title={name}>
      <View style={styles.grid}>
        <View style={gridItemStyle}>
          <Icon name={"dollar"} />
          <Text>{sellPrice}</Text>
        </View>
        <View style={gridItemStyle}>
          <Icon name={"key"} />
          <Text>{sku}</Text>
        </View>
        {expanded && (
          <>
            <View style={gridItemStyle}>
              <Icon name={"number"} />
              <Text>{quantity}</Text>
            </View>
            <View style={gridItemStyle}>
              <Text>{t.cost}</Text>
              <Text>{costPrice}</Text>
            </View>
            <View style={gridItemStyle}>
              <Text>{t.updatedAt}</Text>
              <Text>{updatedAt}</Text>
            </View>
            <Button icon={"pencil"} onPress={handleEdit} style={styles.item}>
              {t.edit}
            </Button>
          </>
        )}
      </View>
    </Card>
  );
};

export { ItemCard };
