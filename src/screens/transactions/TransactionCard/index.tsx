import { View } from "react-native";

import { Card, Icon, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import { COLOR_BY_TX_REASON, ICON_BY_TX_REASON } from "@/db";
import { dateTimeString, formatCurrency } from "@/utils";

import { styles } from "./styles";
import { translations } from "./translations";
import type { TransactionCardProps } from "./types";

const TransactionCard = ({ data }: TransactionCardProps): React.JSX.Element => {
  const { createdAt, notes, reason: txReason, type: txType, transactionItems: txItems } = data;
  const t = useTranslation(translations);
  const colors = useColors();

  const sellPrice = txItems.reduce((acc, el) => acc + (el.sellPrice ?? 0) * el.quantity, 0);
  const buyPrice = txItems.reduce((acc, el) => acc + (el.buyPrice ?? 0) * el.quantity, 0);
  const price = sellPrice === 0 ? buyPrice : sellPrice;

  return (
    <Card>
      <View style={commonStyles.column}>
        <View style={commonStyles.row}>
          <Icon
            color={colors[COLOR_BY_TX_REASON[txReason]]}
            name={ICON_BY_TX_REASON[txReason]}
            size={20}
          />
          <Text style={commonStyles.grow}>{dateTimeString(new Date(createdAt))}</Text>
          {price === 0 ? null : <Text>{formatCurrency(price)}</Text>}
        </View>
        <Text>{`${t.txReason[txReason]} - ${txItems.length} ${t.items}`}</Text>

        {notes && <Text style={styles.notes}>{`${t.notes}: ${notes}`}</Text>}
      </View>
    </Card>
  );
};

export { TransactionCard };
