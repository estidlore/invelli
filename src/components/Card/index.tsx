import { TouchableOpacity, View } from "react-native";

import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { CardProps } from "./types";

const Card = ({ children, onPress, style }: CardProps): React.JSX.Element => {
  const colors = useColors();

  const viewStyle = [
    styles.container,
    { backgroundColor: colors.card, borderColor: colors.border },
    style,
  ];

  if (!onPress) {
    return <View style={viewStyle}>{children}</View>;
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={viewStyle}>
      {children}
    </TouchableOpacity>
  );
};

export type * from "./types";
export { Card };
