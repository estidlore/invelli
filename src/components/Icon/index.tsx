import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Platform } from "react-native";
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from "react-native";

import { useColors } from "@/core/theme";

/**
 * Add SF Symbols and Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const NAMES = {
  bell: { android: "notifications", ios: "bell.fill" },
  check: { android: "check", ios: "checkmark" },
  chevronDown: { android: "keyboard-arrow-down", ios: "chevron.down" },
  dollar: { android: "attach-money", ios: "dollarsign" },
  error: { android: "clear", ios: "xmark" },
  inventory: { android: "inventory", ios: "archivebox.fill" },
  key: { android: "key", ios: "key.fill" },
  number: { android: "numbers", ios: "number" },
  pencil: { android: "edit", ios: "pencil" },
  plus: { android: "add", ios: "plus" },
  qrcode: { android: "qr-code", ios: "qrcode" },
  search: { android: "search", ios: "magnifyingglass" },
  settings: { android: "settings", ios: "gearshape.fill" },
  success: { android: "check", ios: "checkmark" },
  trash: { android: "delete", ios: "trash.fill" },
  warning: { android: "warning", ios: "exclamationmark.triangle.fill" },
  xmark: { android: "clear", ios: "xmark" },
} as const;

type IconName = keyof typeof NAMES;

interface IconProps extends ViewProps {
  color?: string;
  name: IconName;
  size?: number;
  style?: StyleProp<TextStyle & ViewStyle>;
}

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

export type { IconName };
export { Icon };
