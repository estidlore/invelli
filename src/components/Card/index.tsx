import { TouchableOpacity, View } from "react-native";

import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { CardProps } from "./types";

const Card = ({ children, onPress, style, title }: CardProps): React.JSX.Element => {
  const colors = useColors();

  return (
    <TouchableOpacity
      activeOpacity={onPress === undefined ? 1 : 0.5}
      onPress={onPress}
      style={[styles.container, { borderColor: colors.bg3 }, style]}
    >
      <Text type={"subtitle"}>{title}</Text>
      <View style={[styles.hr, { borderBottomColor: colors.bg3 }]} />
      {children}
    </TouchableOpacity>
  );
};

export { Card };
