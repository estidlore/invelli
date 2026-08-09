import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";

import { Button, List, Text, useToast } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { getTransactions, insertTransactionDraft } from "@/db";
import { logError } from "@/utils";

import { TransactionCard } from "./TransactionCard";
import { translations } from "./translations";

const TransactionsScreen = (): React.JSX.Element => {
  const router = useRouter();
  const t = useTranslation(translations);
  const showToast = useToast();

  const { data: transactions, error: transactionsError } = useLiveQuery(
    getTransactions({ isDetailed: true }),
    [],
  );

  const handleAdd = (): void => {
    insertTransactionDraft()
      .then((id) => {
        router.push({
          params: { id },
          pathname: "/transactions/[id]/edit",
        });
      })
      .catch((err) => {
        logError(err);
        showToast(t.startError, "error");
      });
  };

  return (
    <>
      <Text style={commonStyles.mb2} type={"title"}>
        {t.title}
      </Text>
      <List
        data={transactions}
        emptyMsg={t.noTransactions}
        error={transactionsError}
        errorMsg={t.loadError}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard data={item} key={item.id} />}
      />
      <Button
        color={"primary"}
        icon={"cart"}
        iconSize={32}
        onPress={handleAdd}
        style={commonStyles.floatingBtn}
        variant={"solid"}
      />
    </>
  );
};

export { TransactionsScreen };
