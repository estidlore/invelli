import { useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { template } from "litus";
import React from "react";
import { View } from "react-native";

import {
  Button,
  ConfirmationButton,
  List,
  QueryFallback,
  Screen,
  Text,
  useToast,
} from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { deleteItem, getItem } from "@/db";
import { NUM_FORMATS, dateString, getTimeDiff } from "@/utils";

import { TransactionItem } from "./TransactionItem";
import {
  getItemLast30DaysLosses,
  getItemLast30DaysSales,
  getItemRecentTransactions,
} from "./queries";
import { styles } from "./styles";
import { translations } from "./translations";

const ItemScreen = (): React.JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error } = useLiveQuery(getItem(id), [id]);
  const { data: txItems, error: txItemsError } = useLiveQuery(getItemRecentTransactions(id));
  const { data: last30DaysSales } = useQuery({
    queryFn: async () => getItemLast30DaysSales(id),
    queryKey: ["itemLast30DaysSales", id],
  });
  const { data: last30DaysLosses } = useQuery({
    queryFn: async () => getItemLast30DaysLosses(id),
    queryKey: ["itemLast30DaysLosses", id],
  });

  const router = useRouter();
  const t = useTranslation(translations);
  const showToast = useToast();

  if (error || !data) {
    return (
      <Screen goBack title={t.title}>
        <QueryFallback error={error} errorMsg={t.loadError} isPending={!data} />
      </Screen>
    );
  }

  const handleEdit = (): void => {
    router.push({
      params: { id },
      pathname: "/items/[id]/edit",
    });
  };

  const handleDelete = (): void => {
    if (!id) return;
    deleteItem(id)
      .then(() => {
        showToast(t.deleted);
        router.back();
      })
      .catch((err) => {
        const errMsg = err?.message ?? String(err);

        if (errMsg.includes("FOREIGN KEY constraint failed")) {
          showToast(t.delete.inActiveTransactions, "error");
        } else {
          showToast(t.delete.error, "error");
        }
      });
  };

  const profit = data.sellPrice - data.buyPrice;
  const margin = profit / data.sellPrice;
  const markup = profit / data.buyPrice;
  const createdAgo = getTimeDiff(new Date(), new Date(data.createdAt));
  const updatedAgo = getTimeDiff(new Date(), new Date(data.updatedAt));

  return (
    <Screen
      actions={
        <>
          <Button color={"primary"} icon={"pencil"} onPress={handleEdit} variant={"solid"} />
          <ConfirmationButton icon={"trash"} onConfirm={handleDelete} title={t.delete.title} />
        </>
      }
      goBack
      title={t.title}
    >
      <Text style={styles.subtitle} type={"subtitle"}>
        {data.name}
      </Text>

      <View style={styles.row}>
        <Text style={commonStyles.grow} type={"small"}>
          {`${t.createdAt}:  ${createdAgo.unit === "days" ? dateString(new Date(data.createdAt)) : template(t.ago[createdAgo.unit], createdAgo)}`}
        </Text>

        <Text style={commonStyles.grow} type={"small"}>
          {`${t.updatedAt}:  ${template(t.ago[updatedAgo.unit], updatedAgo)}`}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={commonStyles.column}>
          <Text type={"semibold"}>{t.code}</Text>
          <Text type={"semibold"}>{t.stock}</Text>
          <Text type={"semibold"}>{t.price}</Text>
          <Text type={"semibold"}>{t.marginMarkup}</Text>
        </View>
        <View style={commonStyles.column}>
          <Text>{data.code}</Text>
          <Text>
            {`${NUM_FORMATS.PRICE.format(data.quantity * data.buyPrice)} ( ${data.quantity} ${t.units} )`}
          </Text>
          <Text>
            {`${NUM_FORMATS.PRICE.format(data.buyPrice)} / ${NUM_FORMATS.PRICE.format(data.sellPrice)}`}
          </Text>
          <Text>
            {`${NUM_FORMATS.PERCENT.format(margin)} / ${NUM_FORMATS.PERCENT.format(markup)}`}
          </Text>
        </View>
      </View>

      {last30DaysSales && last30DaysLosses && (
        <>
          <Text style={styles.subtitle} type={"subtitle"}>
            {t.last30Days}
          </Text>

          <View style={styles.row}>
            <View style={commonStyles.column}>
              <Text type={"semibold"}>{t.sales}</Text>
              <Text type={"semibold"}>{t.losses}</Text>
              <Text type={"semibold"}>{t.profit}</Text>
            </View>
            <View style={commonStyles.column}>
              <Text>
                {`${NUM_FORMATS.PRICE.format(last30DaysSales.sales)} ( ${last30DaysSales.quantity} ${t.units} )`}
              </Text>
              <Text>
                {`${NUM_FORMATS.PRICE.format(last30DaysLosses.losses)} ( ${last30DaysLosses.quantity} ${t.units} )`}
              </Text>
              <Text>
                {NUM_FORMATS.PRICE.format(last30DaysSales.profit - last30DaysLosses.losses)}
              </Text>
            </View>
          </View>
        </>
      )}

      <Text style={styles.subtitle} type={"subtitle"}>
        {t.transactions.title}
      </Text>
      <List
        data={txItems}
        emptyMsg={t.transactions.empty}
        error={txItemsError}
        errorMsg={t.transactions.loadError}
        keyExtractor={(el) => el.id}
        renderItem={({ item }) => <TransactionItem {...item} />}
      />
    </Screen>
  );
};

export { ItemScreen };
