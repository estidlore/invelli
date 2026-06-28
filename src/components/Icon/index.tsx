import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Platform } from "react-native";

import { useColors } from "@/core/theme";

import { NAMES } from "./names";
import type { IconProps } from "./types";

const Icon = ({ color, name, size = 20, style, ...rest }: IconProps): React.JSX.Element => {
  const colors = useColors();
  const tint = color ?? colors.text;

  if (Platform.OS !== "ios") {
    return (
      <MaterialIcons
        {...rest}
        color={tint}
        name={NAMES[name].android}
        size={size}
        style={style}
        testID={`icon-${name}`}
      />
    );
  }

  return <SymbolView {...rest} name={NAMES[name].ios} size={size} style={style} tintColor={tint} />;
};

export type * from "./types";
export { Icon };
