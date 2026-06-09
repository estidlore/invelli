import type { OneOrMany } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Button, Input, Text } from "@/components";
import { createTranslations, useTranslation } from "@/core/language";
import { searchItems } from "@/db";
import { useDebounce } from "@/hooks/useDebounce";

import { ItemCard } from "./ItemCard";

const translations = createTranslations({
  ENG: {
    addItem: "Add item",
    itemsNotFound: "No items found\nCheck the spelling",
    itemsSearchError: "Failed to search items",
    searchPlaceholder: "Soda Coke 1.5L",
  },
  SPA: {
    addItem: "Agregar artículo",
    itemsNotFound: "No se encontraron artículos\nRevisa la ortografía",
    itemsSearchError: "Fallo al buscar artículos",
    searchPlaceholder: "Gaseosa CocaCola 1.5L",
  },
});

const styles = StyleSheet.create({
  addItem: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  searchError: {
    textAlign: "center",
  },
  searchInput: {
    flexGrow: 1,
  },
});

const InventoryScreen = (): React.JSX.Element => {
  const router = useRouter();
  const t = useTranslation(translations);
  const [searchInput, setSearchInput] = useState("");
  const searchText = useDebounce(searchInput, 400);
  const { data: items, error: itemsError } = useLiveQuery(searchItems(searchText), [searchText]);

  const handleClearSearch = (): void => {
    setSearchInput("");
  };

  const handleAdd = (): void => {
    router.push("/item-form");
  };

  const renderItems = (): OneOrMany<React.JSX.Element> => {
    if (itemsError) {
      return <Text style={styles.searchError}>{t.itemsSearchError}</Text>;
    }
    if (items.length === 0) {
      return <Text style={styles.searchError}>{t.itemsNotFound}</Text>;
    }
    return items.map((item) => <ItemCard item={item} key={item.id} />);
  };

  return (
    <>
      <View style={styles.searchBar}>
        <Button icon={"qrcode"} />
        <Input
          onChange={setSearchInput}
          placeholder={t.searchPlaceholder}
          style={styles.searchInput}
          value={searchInput}
        />
        <Button icon={"xmark"} onPress={handleClearSearch} />
      </View>
      <Button icon={"plus"} onPress={handleAdd} style={styles.addItem}>
        {t.addItem}
      </Button>
      <ScrollView style={styles.list}>{renderItems()}</ScrollView>
    </>
  );
};

export { InventoryScreen };
