import type { StyleProp, TextStyle } from "react-native";

interface SelectProps<T extends SelectOption> {
  label: string;
  onChange?: (value: T extends object ? T["value"] : T, idx: number) => void;
  options: T[];
  style?: StyleProp<TextStyle>;
  value?: T extends object ? T["value"] : T;
}

type SelectOption<T extends number | string = number | string> = Option<T> | T;

interface Option<T extends number | string> {
  text: string;
  value: T;
}

export type { Option, SelectOption, SelectProps };
