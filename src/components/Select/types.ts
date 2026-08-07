import type { StyleProp, ViewStyle } from "react-native";

interface SelectProps<T extends number | string> {
  label: string;
  onBlur?: () => void;
  onChange?: (value: T, idx: number) => void;
  options: SelectOption<T>[];
  style?: StyleProp<ViewStyle>;
  value?: T;
}

interface SelectOption<T extends number | string> {
  text: string;
  value: T;
}

export type { SelectOption, SelectProps };
