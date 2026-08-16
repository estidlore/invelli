import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useDebounce } from "use-debounce";

import { AnimatedScanner, Input, List, QueryFallback, Screen, useToast } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import type { Item, Transaction } from "@/db";
import {
  getItemByCode,
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

  const { data: txItems, error: txItemsError } = useLiveQuery(
    getTransactionItems({ isDetailed: true, transactionId: id }),
    [id],
  );

  const [searchInput, setSearchInput] = useState("");
  const [searchText] = useDebounce(searchInput, 400);
  const { data: items, error: itemsError } = useLiveQuery(searchItems(searchText), [searchText]);

  const t = useTranslation(translations);
  const showToast = useToast();

  if (txItemsError || !txItems) {
    return (
      <Screen goBack title={t.items.title}>
        <QueryFallback error={txItemsError} errorMsg={t.items.loadError} isPending={!txItems} />
      </Screen>
    );
  }

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
    getItemByCode(code)
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
    <Screen goBack title={t.items.title}>
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
    </Screen>
  );
};

export { TransactionAddItems };
