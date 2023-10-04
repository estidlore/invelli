import React from "react";
import { TextInput, View } from "react-native";

import { Alert } from "components/Alert";
import { colors } from "utils/colors";

import { styles } from "./styles";
import type { InputProps } from "./types";

const Input = ({
  maxLength,
  meta,
  onBlur,
  onChange,
  placeholder,
  type = "default",
  secure = false,
  style,
  value,
}: InputProps): JSX.Element => {
  const showAlert = meta?.touched && meta.error !== undefined;

  return (
    <View style={[style, styles.container, showAlert && styles.error]}>
      <TextInput
        keyboardType={type}
        maxLength={maxLength}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.grayLight}
        secureTextEntry={secure}
        style={[styles.input]}
        value={value}
      />
      <Alert hide={!showAlert} style={styles.alert} type={"error"}>
        {meta?.error}
      </Alert>
    </View>
  );
};

export { Input };
