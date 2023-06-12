import React from "react";
import type { TextProps } from "react-native";
import { Text as RNText } from "react-native";

import { styles } from "./styles";

const Text = ({ style, ...otherProps }: TextProps): JSX.Element => {
  return <RNText style={[styles.text, style]} {...otherProps} />;
};

export { Text };
