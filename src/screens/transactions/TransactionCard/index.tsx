import { useRouter } from "expo-router";
import { View } from "react-native";

import { Card, Icon, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import { COLOR_BY_TX_REASON, COLOR_BY_TX_STATUS, ICON_BY_TX_REASON } from "@/db";
import { NUM_FORMATS, dateTimeString } from "@/utils";

import { translations } from "./translations";
import type { TransactionCardProps } from "./types";

const TransactionCard = ({ data }: TransactionCardProps): React.JSX.Element => {
  const { createdAt, notes, reason: txReason, status, transactionItems: txItems } = data;
  const router = useRouter();
  const t = useTranslation(translations);
  const colors = useColors();

  const handleClick = (): void => {
    router.push({
      params: { id: data.id },
      pathname: "/transactions/[id]",
    });
  };

  const sellPrice = txItems.reduce((acc, el) => acc + (el.sellPrice ?? 0) * el.quantity, 0);
  const buyPrice = txItems.reduce((acc, el) => acc + (el.buyPrice ?? 0) * el.quantity, 0);
  const price = sellPrice === 0 ? buyPrice : sellPrice;

  return (
    <Card onPress={handleClick} style={commonStyles.column}>
      <View style={commonStyles.row}>
        <Icon
          color={colors[COLOR_BY_TX_REASON[txReason]]}
          name={ICON_BY_TX_REASON[txReason]}
          size={20}
        />
        <Text style={commonStyles.grow}>{dateTimeString(new Date(createdAt))}</Text>
        {price === 0 ? null : <Text>{NUM_FORMATS.PRICE.format(price)}</Text>}
      </View>
      <View style={commonStyles.rowBetween}>
        <Text>{`${t.reasonMap[txReason]}  -  ${txItems.length} ${t.items}`}</Text>
        {status !== "COMPLETE" && (
          <Text style={{ color: colors[COLOR_BY_TX_STATUS[status]] }}>{t.statusMap[status]}</Text>
        )}
      </View>

      {notes && <Text>{`${t.notes}:  ${notes}`}</Text>}
    </Card>
  );
};

export { TransactionCard };
