import React from "react";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import type { IconProps } from "react-native-vector-icons/Icon";

import { colors } from "utils/colors";

const Icon = ({
  name,
  size = 20,
  style,
  ...otherProps
}: IconProps): JSX.Element => {
  return (
    <FA5Icon
      {...otherProps}
      color={colors.light}
      name={name}
      size={size}
      style={[{ lineHeight: size }, style]}
      testID={`icon-${name}`}
    />
  );
};

export { Icon };
