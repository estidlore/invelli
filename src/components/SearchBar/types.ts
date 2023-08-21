interface SearchBarProps<T> {
  getKeywords: (item: T) => string[];
  items: T[];
  onSearch: (items: T[], input: string) => void;
}

export type { SearchBarProps };
