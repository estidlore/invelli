import { View } from "react-native";

import { Text } from "@/components";
import { commonStyles } from "@/core/theme";
import { formatCurrency } from "@/utils";

import type { TransactionItemProps } from "./types";

const TransactionItem = ({ data, txType }: TransactionItemProps): React.JSX.Element => {
  const { buyPrice, quantity, sellPrice } = data;
  const price = sellPrice === 0 ? (buyPrice ?? 0) : (sellPrice ?? 0);

  return (
    <View style={commonStyles.column}>
      <View style={commonStyles.row}>
        <Text>{data.item.name}</Text>
        <Text>{formatCurrency(price * quantity)}</Text>
      </View>
      {price === 0 ? null : <Text>{`${quantity}x  ${formatCurrency(price)}`}</Text>}
    </View>
  );
};

export { TransactionItem };
