import { useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import type { Theme } from "@/core/theme";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { AlertProps, AlertType } from "./types";

const bgColorByType: Record<AlertType, keyof Theme> = {
  error: "bgError",
  success: "bgSuccess",
  warning: "bgWarning",
};

const textColorByType: Record<AlertType, keyof Theme> = {
  error: "textError",
  success: "textSuccess",
  warning: "textWarning",
};

const Alert = ({ children, hide = false, style, type }: AlertProps): React.ReactNode => {
  const colors = useColors();
  const color = textColorByType[type];

  const [contentHeight, setContentHeight] = useState(0);
  const onLayout = (ev: LayoutChangeEvent): void => {
    setContentHeight(ev.nativeEvent.layout.height);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(hide ? 0 : contentHeight, { duration: 300 }),
      opacity: withTiming(hide ? 0 : 1, { duration: 300 }),
    };
  });

  return (
    <Animated.View style={[styles.animated, style, animatedStyle]}>
      <View
        onLayout={onLayout}
        style={[styles.container, { backgroundColor: colors[bgColorByType[type]] }]}
      >
        <Icon color={color} name={type} size={14} />
        <Text color={color} type={"small"}>
          {children}
        </Text>
      </View>
    </Animated.View>
  );
};

export type * from "./types";
export { Alert };
