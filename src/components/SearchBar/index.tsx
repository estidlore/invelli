import React, { useCallback, useReducer, useState } from "react";
import { View } from "react-native";

import { BarcodeScanner } from "components/BarcodeScanner";
import { Button } from "components/Button";
import { Input } from "components/Input";

import { styles } from "./styles";
import type { SearchBarProps } from "./types";
import { searchItems } from "./utils";

const SearchBar = <T extends unknown>({
  getKeywords,
  items,
  onSearch
}: SearchBarProps<T>): JSX.Element => {
  const [readCode, toggleReadCode] = useReducer((val) => !val, false);
  const [input, setInput] = useState("");

  const handleChange = useCallback(
    (text: string) => {
      const result = searchItems(text, items, getKeywords);
      setInput(text);
      onSearch(result, text);
    },
    [getKeywords, items, onSearch, setInput]
  );

  const clearInput = useCallback(() => {
    handleChange("");
  }, [handleChange]);

  return (
    <View style={styles.container}>
      <Button icon={"qrcode"} onPress={toggleReadCode} />
      <Input onChange={handleChange} placeholder={"Producto"} value={input} />
      <Button icon={"eraser"} onPress={clearInput} />
      <BarcodeScanner
        onClose={toggleReadCode}
        onScan={handleChange}
        visible={readCode}
      />
    </View>
  );
};

export { SearchBar };
