import type { TextProps } from "react-native";
import { Text as RNText } from "react-native";

import { styles } from "./styles";

const Text = ({ style, ...otherProps }: TextProps): React.JSX.Element => {
  return <RNText style={[styles.text, style]} {...otherProps} />;
};

export { Text };
