import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { Button, Input, List } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { searchItems } from "@/db";
import { useDebounce } from "@/hooks";
import { useScanStore } from "@/screens/scanner/store";

import { ItemCard } from "./ItemCard";
import { translations } from "./translations";

const InventoryScreen = (): React.JSX.Element => {
  const router = useRouter();
  const scannedBarcode = useScanStore((state) => state.scannedBarcode);
  const [searchInput, setSearchInput] = useState("");
  const searchText = useDebounce(searchInput, 400);
  const { data: items, error: itemsError } = useLiveQuery(searchItems(searchText), [searchText]);

  const t = useTranslation(translations);

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

  return (
    <>
      <View style={commonStyles.header}>
        <Button icon={"qrcode"} onPress={handleScan} variant={"outline"} />
        <Input
          onChange={setSearchInput}
          placeholder={t.searchPlaceholder}
          style={commonStyles.grow}
          value={searchInput}
        />
      </View>
      <List
        data={items}
        emptyMsg={t.itemsNotFound}
        error={itemsError}
        errorMsg={t.itemsSearchError}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} key={item.id} />}
      />
      <Button
        color={"primary"}
        icon={"plus"}
        iconSize={40}
        onPress={handleAdd}
        style={commonStyles.floatingBtn}
        variant={"solid"}
      />
    </>
  );
};

export { InventoryScreen };
