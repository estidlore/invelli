import { TouchableOpacity, View } from "react-native";

import { Text } from "components/Text";

import { styles } from "./styles";
import type { CardProps } from "./types";

const Card = ({
  children,
  onPress,
  style,
  title,
}: CardProps): React.JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={onPress === undefined ? 1 : 0.5}
      onPress={onPress}
      style={[style, styles.container]}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.hr} />
      {children}
    </TouchableOpacity>
  );
};

export { Card };
