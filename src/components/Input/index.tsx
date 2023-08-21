import React from "react";
import { TextInput } from "react-native";

import { colors } from "utils/colors";

import { styles } from "./styles";
import type { InputProps } from "./types";

const Input = ({
  maxLength,
  onChange,
  placeholder,
  type = "default",
  secure = false,
  style,
  value
}: InputProps): JSX.Element => {
  return (
    <TextInput
      keyboardType={type}
      maxLength={maxLength}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      secureTextEntry={secure}
      style={[style, styles.input]}
      value={value}
    />
  );
};

export { Input };
