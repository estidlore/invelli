import { FlatList } from "react-native";

import { Button, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles, useColors } from "@/core/theme";

import { TransactionCard } from "./TransactionCard";
import { dummyTransactions } from "./dummy";
import { styles } from "./styles";
import { translations } from "./translations";

const TransactionsScreen = (): React.JSX.Element => {
  const t = useTranslation(translations);
  const colors = useColors();

  return (
    <>
      <Text type={"title"}>{t.transactions}</Text>
      <FlatList
        contentContainerStyle={commonStyles.listContent}
        data={dummyTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard data={item} key={item.id} />}
        style={styles.list}
      />
      <Button
        icon={"plus"}
        iconSize={40}
        style={[commonStyles.floatingBtn, { backgroundColor: colors.primary }]}
      />
    </>
  );
};

export { TransactionsScreen };
