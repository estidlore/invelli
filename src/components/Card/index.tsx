import { TouchableOpacity } from "react-native";

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
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {title === undefined ? null : (
        <Text style={styles.title} type={"subtitle"}>
          {title}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

export type * from "./types";
export { Card };
