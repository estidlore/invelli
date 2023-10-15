interface SelectProps<T extends SelectOption> {
  label: string;
  onChange?: (option: T) => void;
  options: T[];
}

type SelectOption<T extends number | string = number | string> = Option<T> | T;

interface Option<T extends number | string> {
  text: string;
  value: T;
}

export type { Option, SelectOption, SelectProps };
