import type { KeyboardType, TextInputProps } from "react-native";

interface InputProps
  extends Pick<
    TextInputProps,
    "maxLength" | "onBlur" | "placeholder" | "style" | "value"
  > {
  meta?: {
    error?: string;
    touched: boolean;
  };
  onChange?: TextInputProps["onChangeText"];
  secure?: boolean;
  type?: KeyboardType;
}

export type { InputProps };
