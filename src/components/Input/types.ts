import type { KeyboardType, TextInputProps } from "react-native";

interface InputProps
  extends Pick<TextInputProps, "maxLength" | "placeholder" | "value"> {
  type?: KeyboardType;
  secure?: boolean;
  onChange?: TextInputProps["onChangeText"];
}

export type { InputProps };
