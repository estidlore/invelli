import { useRouter } from "expo-router";
import { View } from "react-native";

import { Card, Icon, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { NUM_FORMATS } from "@/utils";

import { translations } from "./translations";
import type { ItemCardProps } from "./types";

const ItemCard = ({ item }: ItemCardProps): React.JSX.Element => {
  const { buyPrice, code, name, quantity, sellPrice } = item;
  const router = useRouter();
  const t = useTranslation(translations);

  const handleEdit = (): void => {
    router.push({
      params: {
        id: item.id,
      },
      pathname: "/item-form",
    });
  };

  return (
    <Card onPress={handleEdit} style={commonStyles.column}>
      <Text style={commonStyles.mb} type={"semibold"}>
        {name}
      </Text>
      <View style={commonStyles.row}>
        <Text style={commonStyles.grow} type={"semibold"}>
          {NUM_FORMATS.PRICE.format(sellPrice)}
        </Text>
        <View style={[commonStyles.grow, commonStyles.row]}>
          <Icon name={"inventory"} />
          <Text>{`${NUM_FORMATS.QUANTITY.format(quantity)} ${t.units}`}</Text>
        </View>
      </View>
      <View style={commonStyles.row}>
        <Icon name={"qrcode"} />
        <Text>{code ?? "-"}</Text>
      </View>
    </Card>
  );
};

export { ItemCard };
