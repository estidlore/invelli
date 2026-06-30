import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";

import { Button, Icon, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";
import { COLOR_BY_TX_REASON, ICON_BY_TX_REASON } from "@/db";
import { formatCurrency } from "@/utils";

import { TransactionItem } from "./TransactionItem";
import { dummyTransaction } from "./dummy";
import { styles } from "./styles";
import { translations } from "./translations";

const TransactionDetailScreen = (): React.JSX.Element => {
  const data = dummyTransaction;
  const router = useRouter();
  const t = useTranslation(translations);
  const colors = useColors();

  const { createdAt, notes, reason: txReason, type: txType, transactionItems: txItems } = data;

  const handleBack = (): void => {
    router.back();
  };

  const sellTotal = txItems.reduce((acc, el) => acc + (el.sellPrice ?? 0) * el.quantity, 0);
  const buyTotal = txItems.reduce((acc, el) => acc + (el.buyPrice ?? 0) * el.quantity, 0);

  return (
    <>
      <View style={commonStyles.header}>
        <Icon
          color={colors[COLOR_BY_TX_REASON[txReason]]}
          name={ICON_BY_TX_REASON[txReason]}
          size={24}
        />
        <Text type={"subtitle"}>{t.transaction}</Text>
        <Button icon={"xmark"} onPress={handleBack} />
      </View>

      <View style={commonStyles.row}>
        <View style={commonStyles.column}>
          <Text>{t.date}</Text>
          <Text>{t.reason}</Text>
          <Text>{t.notes}</Text>
        </View>
        <View style={commonStyles.column}>
          <Text>{createdAt}</Text>
          <Text>{t.reasons[txReason]}</Text>
          <Text>{notes}</Text>
        </View>
      </View>

      <View style={[commonStyles.row, styles.total, { borderBottomColor: colors.textDisabled }]}>
        <Text>{t.total}</Text>
        <Text>{formatCurrency(sellTotal === 0 ? buyTotal : sellTotal)}</Text>
      </View>

      <FlatList
        contentContainerStyle={commonStyles.listContent}
        data={txItems}
        keyExtractor={(el) => el.id}
        renderItem={({ item }) => <TransactionItem data={item} txType={txType} />}
      />
      <Button
        icon={"pencil"}
        iconSize={32}
        style={[commonStyles.floatingBtn, { backgroundColor: colors.primary }]}
      />
    </>
  );
};

export { TransactionDetailScreen };
