import type { OneOrMany } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { Button, Input, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { useScanStore } from "@/core/scanner";
import { commonStyles, useColors } from "@/core/theme";
import { searchItems } from "@/db";
import { useDebounce } from "@/hooks/useDebounce";
import { logError } from "@/utils";

import { ItemCard } from "./ItemCard";
import { styles } from "./styles";
import { translations } from "./translations";

const InventoryScreen = (): React.JSX.Element => {
  const router = useRouter();
  const { scannedBarcode } = useScanStore();
  const [searchInput, setSearchInput] = useState("");
  const searchText = useDebounce(searchInput, 400);
  const { data: items, error: itemsError } = useLiveQuery(searchItems(searchText), [searchText]);

  const t = useTranslation(translations);
  const colors = useColors();

  const handleClearSearch = (): void => {
    setSearchInput("");
  };

  const handleAdd = (): void => {
    router.push("/item-form");
  };

  const handleScan = (): void => {
    router.push("/scanner");
  };

  useEffect(() => {
    if (scannedBarcode) {
      setSearchInput(scannedBarcode);
    }
  }, [scannedBarcode]);

  const renderItems = (): OneOrMany<React.JSX.Element> => {
    if (itemsError) {
      logError("renderItems.itemsError", itemsError);
      return <Text style={styles.searchError}>{t.itemsSearchError}</Text>;
    }
    if (items.length === 0) {
      return <Text style={styles.searchError}>{t.itemsNotFound}</Text>;
    }
    return (
      <FlatList
        contentContainerStyle={commonStyles.listContent}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} key={item.id} />}
      />
    );
  };

  return (
    <>
      <View style={styles.searchBar}>
        <Button icon={"qrcode"} onPress={handleScan} />
        <Input
          onChange={setSearchInput}
          placeholder={t.searchPlaceholder}
          style={commonStyles.grow}
          value={searchInput}
        />
        <Button icon={"xmark"} onPress={handleClearSearch} />
      </View>
      {renderItems()}
      <Button
        icon={"plus"}
        iconSize={40}
        onPress={handleAdd}
        style={[commonStyles.floatingBtn, { backgroundColor: colors.primary }]}
      />
    </>
  );
};

export { InventoryScreen };
