import { useState } from "react";
import type { BlurEvent } from "react-native";
import { TextInput, View } from "react-native";

import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { InputProps } from "./types";

const Input = ({
  label,
  maxLength,
  meta,
  onBlur,
  onChange,
  placeholder,
  secure = false,
  style,
  type = "default",
  value,
}: InputProps): React.JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const showAlert = meta?.touched && meta.error !== undefined;
  const showClearBtn = value && isFocused;
  const colors = useColors();

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (ev: BlurEvent): void => {
    setIsFocused(false);
    onBlur?.(ev);
  };

  const handleClear = (): void => {
    onChange?.("");
  };

  return (
    <View style={style}>
      {label && (
        <Text style={styles.label} type={"small"}>
          {label}
        </Text>
      )}
      <View style={[styles.box, { borderColor: showAlert ? colors.bgError : colors.border }]}>
        <View style={[styles.inputRow, { backgroundColor: colors.card }]}>
          <TextInput
            accessibilityLabel={label}
            keyboardType={type}
            maxLength={maxLength}
            onBlur={handleBlur}
            onChangeText={onChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            placeholderTextColor={`${colors.text}cc`}
            secureTextEntry={secure}
            style={[styles.input, { color: colors.text }]}
            value={value}
          />
          {showClearBtn && <Button color={"text2"} icon={"xmark"} onPress={handleClear} />}
        </View>
        <Alert hide={!showAlert} style={styles.alert} type={"error"}>
          {meta?.error}
        </Alert>
      </View>
    </View>
  );
};

export type * from "./types";
export { Input };
