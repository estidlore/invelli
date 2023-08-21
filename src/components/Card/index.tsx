import React from "react";
import { View } from "react-native";

import { Text } from "components/Text";

import { styles } from "./styles";
import type { CardProps } from "./types";

const Card = ({ children, title }: CardProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.hr} />
      {children}
    </View>
  );
};

export { Card };
