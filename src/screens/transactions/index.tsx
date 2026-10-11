import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";

import { FloatingButton, List, Screen, useToast } from "@/components";
import { useTranslation } from "@/core/language";
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
    <Screen title={t.title}>
      <List
        data={transactions}
        emptyMsg={t.noTransactions}
        error={transactionsError}
        errorMsg={t.loadError}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard data={item} key={item.id} />}
      />
      <FloatingButton icon={"cart"} onPress={handleAdd} />
    </Screen>
  );
};

export { TransactionsScreen };
