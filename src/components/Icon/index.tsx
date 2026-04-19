import FA5Icon from "react-native-vector-icons/FontAwesome5";
import type { IconProps } from "react-native-vector-icons/Icon";

import { colors } from "utils";

const Icon = ({
  color = colors.light,
  name,
  size = 20,
  style,
  ...otherProps
}: IconProps): React.JSX.Element => {
  return (
    <FA5Icon
      {...otherProps}
      color={color}
      name={name}
      size={size}
      style={[{ lineHeight: size }, style]}
      testID={`icon-${name}`}
    />
  );
};

export { Icon };
