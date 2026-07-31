import { ActivityIndicator, FlatList, View } from "react-native";

import { Text } from "@/components/Text";
import { commonStyles, useColors } from "@/core/theme";
import { logError } from "@/utils";

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
  const colors = useColors();

  if (error) {
    logError("List error:", error);

    return (
      <View style={style}>
        <Text style={commonStyles.textCenter}>{errorMsg}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[commonStyles.center, style]}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
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
