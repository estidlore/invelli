import { FlatList } from "react-native";

import { QueryBoundary } from "@/components/QueryBoundary";
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
  return (
    <QueryBoundary error={error} errorMsg={errorMsg} isPending={!data}>
      {data?.length === 0 ? (
        <Text style={commonStyles.textCenter}>{emptyMsg}</Text>
      ) : (
        <FlatList
          {...rest}
          contentContainerStyle={[commonStyles.listContent, contentContainerStyle]}
          data={data}
          style={style}
        />
      )}
    </QueryBoundary>
  );
};

export { List };
