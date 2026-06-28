import { TouchableOpacity } from "react-native";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { ButtonProps } from "./types";

const Button = ({
  activeOpacity = 0.5,
  children,
  icon,
  style,
  ...otherProps
}: ButtonProps): React.JSX.Element => {
  const colors = useColors();

  return (
    <TouchableOpacity
      {...otherProps}
      activeOpacity={activeOpacity}
      style={[styles.container, { borderColor: colors.border }, style]}
    >
      {icon === undefined ? null : <Icon name={icon} size={20} style={styles.text} />}
      {children === undefined ? null : <Text style={styles.text}>{children}</Text>}
    </TouchableOpacity>
  );
};

export type * from "./types";
export { Button };
