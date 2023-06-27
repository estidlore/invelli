import React, { useCallback, useState } from "react";
import { View } from "react-native";

import { Button, Input } from "components";

import { styles } from "./styles";
import type { SearchBarProps } from "./types";
import { searchItems } from "./utils";

const SearchBar = <T extends unknown>({
  getKeywords,
  items,
  onChange
}: SearchBarProps<T>): JSX.Element => {
  const [input, setInput] = useState("");

  const handleChange = useCallback(
    (text: string) => {
      const result = searchItems(text, items, getKeywords);
      setInput(text);
      onChange(result);
    },
    [getKeywords, items, onChange, setInput]
  );

  const clearInput = useCallback(() => {
    setInput("");
  }, [setInput]);

  return (
    <View style={styles.container}>
      <Button icon={"qrcode"} />
      <Input onChange={handleChange} placeholder={"Producto"} value={input} />
      <Button icon={"eraser"} onPress={clearInput} />
    </View>
  );
};

export { SearchBar };
