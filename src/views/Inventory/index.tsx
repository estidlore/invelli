import React, { useReducer, useState } from "react";
import { ScrollView } from "react-native";

import { Button, SearchBar, Text } from "components";
import { useCollection } from "utils/db";
import type { Item } from "utils/types";
import { ItemAdd } from "views/modals/ItemAdd";

import { ItemCard } from "./ItemCard";
import { styles } from "./styles";
import { itemToKeywords } from "./utils";

const InventoryScreen = (): JSX.Element => {
  const items = useCollection("Item");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [showItemAdd, toggleItemAdd] = useReducer((val) => !val, false);

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
      <ItemAdd onClose={toggleItemAdd} visible={showItemAdd} />
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
