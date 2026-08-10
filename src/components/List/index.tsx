import { FlatList } from "react-native";

import { QueryFallback } from "@/components/QueryFallback";
import { Text } from "@/components/Text";
import { commonStyles } from "@/core/theme";

import type { ListProps } from "./types";

const List = <T,>({
  contentContainerStyle,
  data,
  emptyMsg,
  error,
  errorMsg,
  style,
  ...rest
}: ListProps<T>): React.JSX.Element => {
  if (error || !data) {
    return <QueryFallback error={error} errorMsg={errorMsg} isPending={!data} />;
  }

  if (data.length === 0) {
    return <Text style={commonStyles.textCenter}>{emptyMsg}</Text>;
  }

  return (
    <FlatList
      {...rest}
      contentContainerStyle={[commonStyles.listContent, contentContainerStyle]}
      data={data}
      style={style}
    />
  );
};

export { List };
