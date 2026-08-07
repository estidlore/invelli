import type { KeyboardType, TextInputProps, ViewStyle } from "react-native";

interface InputProps extends Pick<TextInputProps, "maxLength" | "placeholder" | "value"> {
  label?: string;
  max?: number;
  meta?: {
    error?: string;
    touched: boolean;
  };
  min?: number;
  onBlur?: (overrideValue?: string) => void;
  onChange?: TextInputProps["onChangeText"];
  secure?: boolean;
  style?: ViewStyle;
  type?: KeyboardType;
  value: string;
}

export type { InputProps };
