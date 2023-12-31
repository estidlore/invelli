import React, { useCallback, useState } from "react";
import { View } from "react-native";

import { BarcodeScanner } from "components/BarcodeScanner";
import { Button } from "components/Button";
import { Input } from "components/Input";

import { useTranslation } from "./language";
import { styles } from "./styles";
import type { SearchBarProps } from "./types";
import { searchItems } from "./utils";

const SearchBar = <T extends unknown>({
  getKeywords,
  items,
  onSearch,
}: SearchBarProps<T>): JSX.Element => {
  const t = useTranslation();
  const [input, setInput] = useState("");

  const handleChange = useCallback(
    (text: string) => {
      const result = searchItems(text, items, getKeywords);
      setInput(text);
      onSearch(result, text);
    },
    [getKeywords, items, onSearch, setInput],
  );

  const clearInput = useCallback(() => {
    handleChange("");
  }, [handleChange]);

  return (
    <View style={styles.container}>
      <BarcodeScanner onScan={handleChange} />
      <Input
        onChange={handleChange}
        placeholder={t.product}
        style={styles.input}
        value={input}
      />
      <Button icon={"eraser"} onPress={clearInput} />
    </View>
  );
};

export { SearchBar };
