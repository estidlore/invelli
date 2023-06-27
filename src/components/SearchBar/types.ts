interface SearchBarProps<T> {
  getKeywords: (item: T) => string[];
  items: T[];
  onChange: (items: T[]) => void;
}

export type { SearchBarProps };
