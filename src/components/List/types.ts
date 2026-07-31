import type { FlatListProps } from "react-native";

interface ListProps<T> extends FlatListProps<T> {
  emptyMsg?: string;
  error?: Error;
  errorMsg?: string;
}

export type { ListProps };
