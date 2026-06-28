import { View } from "react-native";

import { Text } from "@/components";
import { useTranslation } from "@/core/language";

import { translations } from "./translations";

const TransactionsScreen = (): React.JSX.Element => {
  const t = useTranslation(translations);

  return (
    <View>
      <Text type={"title"}>{t.transactions}</Text>
    </View>
  );
};

export { TransactionsScreen };
