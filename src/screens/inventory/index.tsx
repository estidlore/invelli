import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDebounce } from "use-debounce";

import { Button, FloatingButton, Input, List } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { searchItems } from "@/db";
import { useScanStore } from "@/screens/scanner/store";

import { ItemCard } from "./ItemCard";
import { translations } from "./translations";

const InventoryScreen = (): React.JSX.Element => {
  const router = useRouter();
  const scannedBarcode = useScanStore((state) => state.scannedBarcode);
  const [searchInput, setSearchInput] = useState("");
  const [searchText] = useDebounce(searchInput, 400);
  const { data: items, error: itemsError } = useLiveQuery(searchItems(searchText), [searchText]);

  const t = useTranslation(translations);

  const handleAdd = (): void => {
    router.push("/items/new");
  };

  const handleScan = (): void => {
    router.push("/scanner");
  };

  useEffect(() => {
    if (scannedBarcode) {
      setSearchInput(scannedBarcode);
    }
  }, [scannedBarcode]);

  return (
    <>
      <View style={commonStyles.header}>
        <Button icon={"qrcode"} onPress={handleScan} variant={"outline"} />
        <Input
          onChange={setSearchInput}
          placeholder={t.items.searchPlaceholder}
          style={commonStyles.grow}
          value={searchInput}
        />
      </View>
      <List
        data={items}
        emptyMsg={searchInput === "" ? t.items.empty : t.items.notFound}
        error={itemsError}
        errorMsg={t.items.searchError}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} key={item.id} />}
      />
      <FloatingButton icon={"plus"} iconSize={40} onPress={handleAdd} />
    </>
  );
};

export { InventoryScreen };
