import { ScrollView, StyleSheet } from "react-native";

import { Button } from "@/components";
import { createTranslations, useTranslation } from "@/core/language";

import { ItemCard } from "./ItemCard";
import { dummyItems } from "./dummy";

const translations = createTranslations({
  ENG: {
    addItem: "Add item",
  },
  SPA: {
    addItem: "Agregar artículo",
  },
});

const styles = StyleSheet.create({
  addItem: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
});

const InventoryScreen = (): React.JSX.Element => {
  const t = useTranslation(translations);

  return (
    <>
      <Button icon={"plus"} style={styles.addItem}>
        {t.addItem}
      </Button>
      <ScrollView style={styles.list}>
        {dummyItems.map((item) => (
          <ItemCard item={item} key={item.id.toString()} />
        ))}
      </ScrollView>
    </>
  );
};

export { InventoryScreen };
