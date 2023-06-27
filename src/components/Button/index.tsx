import React from "react";
import { TouchableOpacity } from "react-native";

import { Icon, Text } from "components";

import { styles } from "./styles";
import type { ButtonProps } from "./types";

const Button = ({
  activeOpacity = 0.5,
  children,
  icon,
  style,
  ...otherProps
}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      {...otherProps}
      activeOpacity={activeOpacity}
      style={[styles.container, style]}
    >
      {icon === undefined ? null : (
        <Icon name={icon} size={20} style={styles.text} />
      )}
      {children === undefined ? null : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export { Button };
