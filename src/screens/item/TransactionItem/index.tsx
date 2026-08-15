import { useRouter } from "expo-router";
import { View } from "react-native";

import { Card, Icon, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { COLOR_BY_TX_REASON, ICON_BY_TX_REASON } from "@/db";
import { NUM_FORMATS, dateTimeString } from "@/utils";

import { translations } from "./translations";
import type { TransactionItemProps } from "./types";

const TransactionItem = ({
  buyPrice,
  quantity,
  sellPrice,
  transaction: tx,
}: TransactionItemProps): React.JSX.Element => {
  const price =
    tx.reason === "SALE" || tx.reason === "SALE_RETURN" ? (sellPrice ?? 0) : (buyPrice ?? 0);

  const router = useRouter();
  const t = useTranslation(translations);

  const handlePress = (): void => {
    router.dismissTo({
      params: { id: tx.id },
      pathname: "/transactions/[id]",
    });
  };

  return (
    <Card onPress={handlePress}>
      <View style={commonStyles.row}>
        <Icon color={COLOR_BY_TX_REASON[tx.reason]} name={ICON_BY_TX_REASON[tx.reason]} size={20} />
        <Text style={commonStyles.grow}>{t.reasonMap[tx.reason]}</Text>

        <Text type={"semibold"}>{NUM_FORMATS.PRICE.format(price * quantity)}</Text>
      </View>
      <View style={[commonStyles.row, commonStyles.mt]}>
        <Text style={commonStyles.grow} type={"small"}>
          {dateTimeString(new Date(tx.updatedAt))}
        </Text>
        <Text>{`${quantity} x ${NUM_FORMATS.PRICE.format(price)}`}</Text>
      </View>
    </Card>
  );
};

export { TransactionItem };
