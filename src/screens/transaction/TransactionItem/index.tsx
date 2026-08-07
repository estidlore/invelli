import { View } from "react-native";

import { Text } from "@/components";
import { commonStyles, useColors } from "@/core/theme";
import { NUM_FORMATS, hasEnoughStock } from "@/utils";

import { styles } from "./styles";
import type { TransactionItemProps } from "./types";

const TransactionItem = ({ data, tx }: TransactionItemProps): React.JSX.Element => {
  const { buyPrice, item, quantity, sellPrice } = data;
  const price = sellPrice === 0 ? (buyPrice ?? 0) : (sellPrice ?? 0);

  const colors = useColors();

  const hasStock = hasEnoughStock(tx, [{ quantity: data.quantity, stock: data.item.quantity }]);

  return (
    <View style={[commonStyles.row, styles.container, { borderBottomColor: colors.textDisabled }]}>
      <View style={[commonStyles.column, commonStyles.grow]}>
        <Text style={!hasStock && { color: colors.textWarning }}>{data.item.name}</Text>
        {item.code && <Text>{item.code}</Text>}
      </View>
      <View style={[commonStyles.column, commonStyles.itemsEnd]}>
        <Text>{NUM_FORMATS.PRICE.format(price * quantity)}</Text>
        <Text>{`${quantity} x ${NUM_FORMATS.PRICE.format(price)}`}</Text>
      </View>
    </View>
  );
};

export { TransactionItem };
