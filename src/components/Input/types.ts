import type { KeyboardType, TextInputProps } from "react-native";

interface InputProps
  extends Pick<
    TextInputProps,
    "maxLength" | "placeholder" | "style" | "value"
  > {
  type?: KeyboardType;
  secure?: boolean;
  onChange?: TextInputProps["onChangeText"];
}

export type { InputProps };
