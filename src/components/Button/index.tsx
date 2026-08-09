import { TouchableOpacity } from "react-native";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";

import { styles } from "./styles";
import type { ButtonProps } from "./types";
import { useButtonColors } from "./useButtonColors";

const Button = ({
  activeOpacity = 0.5,
  children,
  color = "text",
  icon,
  iconSize = 20,
  style,
  variant = "text",
  ...otherProps
}: ButtonProps): React.JSX.Element => {
  const { color: textColor, ...containerStyle } = useButtonColors(variant, color);

  return (
    <TouchableOpacity
      {...otherProps}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle, style]}
    >
      {icon === undefined ? null : <Icon color={textColor} name={icon} size={iconSize} />}
      {children === undefined ? null : <Text color={textColor}>{children}</Text>}
    </TouchableOpacity>
  );
};

export type * from "./types";
export { Button };
