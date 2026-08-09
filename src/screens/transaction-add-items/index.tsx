import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDebounce } from "use-debounce";

import { AnimatedScanner, Button, Input, List, Text, useToast } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import type { Item, Transaction } from "@/db";
import {
  getItem,
  getTransactionItems,
  incrementTransactionItem,
  insertTransactionItem,
  searchItems,
} from "@/db";
import { logError } from "@/utils";

import { ItemCard } from "./ItemCard";
import { styles } from "./styles";
import { translations } from "./translations";

const TransactionAddItems = (): React.JSX.Element => {
  const { id } = useLocalSearchParams<Pick<Transaction, "id">>();
  const router = useRouter();

  const { data: txItems, error: txItemsError } = useLiveQuery(
    getTransactionItems({ isDetailed: true, transactionId: id }),
    [id],
  );

  const [searchInput, setSearchInput] = useState("");
  const [searchText] = useDebounce(searchInput, 400);
  const { data: items, error: itemsError } = useLiveQuery(searchItems(searchText), [searchText]);

  const t = useTranslation(translations);
  const colors = useColors();
  const showToast = useToast();

  if (txItemsError) {
    return (
      <View style={commonStyles.center}>
        <Text color={"textError"}>{t.items.loadError}</Text>
      </View>
    );
  }

  if (!txItems) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  const handleBack = (): void => {
    router.back();
  };

  const handleAddItem = (item: Item): void => {
    const txItem = txItems.find((el) => el.itemId === item.id);
    if (txItem) {
      incrementTransactionItem(txItem.id)
        .then(() => {
          showToast(t.items.added);
        })
        .catch((err) => {
          showToast(t.items.addError, "error");
          logError(err);
        });
    } else {
      insertTransactionItem({
        buyPrice: item.buyPrice,
        itemId: item.id,
        quantity: 1,
        sellPrice: item.sellPrice,
        transactionId: id,
      })
        .then(() => {
          showToast(t.items.added);
        })
        .catch((err) => {
          showToast(t.items.addError, "error");
          logError(err);
        });
    }
  };

  const handleScan = (code: string): void => {
    getItem(code)
      .then((item) => {
        if (!item) {
          showToast(t.items.codeNotFound);
          return;
        }
        handleAddItem(item);
      })
      .catch((err) => {
        showToast(t.items.searchError, "error");
        logError(err);
      });
  };

  return (
    <>
      <View style={[commonStyles.row, commonStyles.mb2]}>
        <Button icon={"back"} onPress={handleBack} />
        <Text type={"title"}>{t.items.title}</Text>
      </View>
      <AnimatedScanner onScan={handleScan} />
      <Input
        onChange={setSearchInput}
        placeholder={t.placeholder.search}
        style={commonStyles.my}
        value={searchInput}
      />
      <View style={styles.searchPanel}>
        <List
          data={items}
          emptyMsg={searchInput ? t.items.itemsNotFound : t.items.empty}
          error={itemsError}
          errorMsg={t.items.loadError}
          renderItem={({ item }) => <ItemCard item={item} onPress={handleAddItem} />}
        />
      </View>
    </>
  );
};

export { TransactionAddItems };
