import React, { useCallback, useReducer, useState } from "react";
import { ScrollView } from "react-native";
import Realm from "realm";

import { Button, SearchBar, Text } from "components";
import { useCollection, useRealm } from "utils/db";
import type { Item } from "utils/types";
import { ItemForm } from "views/modals/ItemForm";

import { ItemCard } from "./ItemCard";
import { styles } from "./styles";
import { itemToKeywords } from "./utils";

const InventoryScreen = (): JSX.Element => {
  const items = useCollection("Item");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [showItemAdd, toggleItemAdd] = useReducer((val) => !val, false);
  const db = useRealm();

  const handleAdd = useCallback(
    (data: Omit<Item, "id">) => {
      db.write(() => {
        const item = Object.assign({}, data, { id: new Realm.BSON.UUID() });
        db.create("Item", item);
      });
    },
    [db],
  );

  return (
    <>
      <SearchBar
        getKeywords={itemToKeywords}
        items={items}
        onSearch={setFilteredItems}
      />
      <Button icon={"plus"} onPress={toggleItemAdd} style={styles.addButton}>
        {"Agregar artículo"}
      </Button>
      <ItemForm
        onClose={toggleItemAdd}
        onSave={handleAdd}
        visible={showItemAdd}
      />
      <ScrollView>
        {filteredItems.length === 0 ? (
          <Text>{"Artículo(s) no encontrado(s)"}</Text>
        ) : (
          filteredItems.map((item) => (
            <ItemCard item={item} key={item.id.toString()} />
          ))
        )}
      </ScrollView>
    </>
  );
};

export { InventoryScreen };
