import { useState } from "react";
import { TextInput, View } from "react-native";

import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";
import { NUM_FORMATS, clamp } from "@/utils";

import { styles } from "./styles";
import type { InputProps } from "./types";

const handleControl = (x: string, delta: number, min?: number, max?: number): string => {
  const num = Number(x);
  const clamped = clamp((isNaN(num) ? 0 : num) + delta, min, max);
  return NUM_FORMATS.FORM_QUANTITY.format(clamped);
};

const Input = ({
  label,
  max,
  maxLength,
  meta,
  min,
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
  const showClearBtn = value.length > 0 && isFocused;
  const colors = useColors();

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    const num = handleControl(value, 0, min, max);
    setIsFocused(false);

    if (num !== value) {
      onChange?.(num);
      onBlur?.(num);
    } else {
      onBlur?.();
    }
  };

  const handleClear = (): void => {
    onChange?.("");
  };

  const handleNumChange = (val: string): void => {
    onChange?.(val);
  };

  const handleSubtract = (): void => {
    const num = handleControl(value, -1, min, max);
    onChange?.(num);
  };

  const handleAdd = (): void => {
    const num = handleControl(value, 1, min, max);
    onChange?.(num);
  };

  return (
    <View style={style}>
      {label && (
        <Text style={styles.label} type={"small"}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.box,
          {
            backgroundColor: colors.card,
            borderColor: showAlert ? colors.bgError : colors.border,
          },
        ]}
      >
        {type === "numeric" && <Button icon={"minus"} onPress={handleSubtract} />}
        <TextInput
          accessibilityLabel={label}
          keyboardType={type}
          maxLength={maxLength}
          onBlur={handleBlur}
          onChangeText={type === "numeric" ? handleNumChange : onChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={`${colors.text}cc`}
          secureTextEntry={secure}
          style={[styles.input, { color: colors.text }]}
          value={value}
        />
        {type === "numeric" ? (
          <Button icon={"plus"} onPress={handleAdd} />
        ) : (
          showClearBtn && <Button color={"text2"} icon={"xmark"} onPress={handleClear} />
        )}
        <Alert hide={!showAlert} style={styles.alert} type={"error"}>
          {meta?.error}
        </Alert>
      </View>
    </View>
  );
};

export type * from "./types";
export { Input };
