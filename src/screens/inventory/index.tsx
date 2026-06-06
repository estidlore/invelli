import { useRouter } from "expo-router";
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
  const router = useRouter();
  const t = useTranslation(translations);

  const handleAdd = (): void => {
    router.push("/item-form");
  };

  return (
    <>
      <Button icon={"plus"} onPress={handleAdd} style={styles.addItem}>
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
