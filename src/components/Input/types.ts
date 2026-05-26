import type { KeyboardType, TextInputProps, ViewStyle } from "react-native";

interface InputProps extends Pick<
  TextInputProps,
  "maxLength" | "onBlur" | "placeholder" | "value"
> {
  meta?: {
    error?: string;
    touched: boolean;
  };
  onChange?: TextInputProps["onChangeText"];
  secure?: boolean;
  style?: ViewStyle;
  type?: KeyboardType;
}

export type { InputProps };
