import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { Text } from "@/components";
import { useColors } from "@/core/theme";
import { NUM_FORMATS } from "@/utils";

import { styles } from "./styles";
import type { TransactionItemProps } from "./types";

const TransactionItem = ({ data, tx }: TransactionItemProps): React.JSX.Element => {
  const { buyPrice, item, quantity, sellPrice } = data;
  const price = sellPrice === 0 ? (buyPrice ?? 0) : (sellPrice ?? 0);

  const router = useRouter();
  const colors = useColors();

  const handlePress = (): void => {
    router.dismissTo({
      params: { id: data.itemId },
      pathname: "/(stack)/items/[id]",
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
      style={[styles.container, { borderBottomColor: colors.textDisabled }]}
    >
      <View style={styles.columnLeft}>
        <Text>{data.item.name}</Text>
        {item.code && <Text>{item.code}</Text>}
      </View>
      <View style={styles.columnRight}>
        <Text>{NUM_FORMATS.PRICE.format(price * quantity)}</Text>
        <Text>{`${quantity} x ${NUM_FORMATS.PRICE.format(price)}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { TransactionItem };
