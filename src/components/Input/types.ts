import type { KeyboardType, TextInputProps, ViewStyle } from "react-native";

interface InputProps extends Pick<
  TextInputProps,
  "maxLength" | "onBlur" | "placeholder" | "value"
> {
  label?: string;
  max?: number;
  meta?: {
    error?: string;
    touched: boolean;
  };
  min?: number;
  onChange?: TextInputProps["onChangeText"];
  secure?: boolean;
  style?: ViewStyle;
  type?: KeyboardType;
  value: string;
}

export type { InputProps };
