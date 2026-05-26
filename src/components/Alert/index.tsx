import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

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

const Alert = ({ children, hide = false, style, type }: AlertProps): React.JSX.Element => {
  const height = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  useEffect(() => {
    height.value = withTiming(hide ? 0 : 30, { duration: 300 });
  }, [height, hide]);

  const colors = useColors();

  return (
    <Animated.View style={[style, { backgroundColor: colors[bgColorByType[type]] }, animatedStyle]}>
      <View style={styles.container}>
        <Icon color={colors[textColorByType[type]]} name={type} size={16} />
        <Text style={[styles.text, { color: colors[textColorByType[type]] }]} type={"semibold"}>
          {children}
        </Text>
      </View>
    </Animated.View>
  );
};

export { Alert };
