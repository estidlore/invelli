import { useEffect } from "react";
import { Animated, useAnimatedValue, View } from "react-native";

import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { useLayout } from "utils";

import { styles } from "./styles";
import type { AlertProps, AlertType } from "./types";

const icons: Record<AlertType, string> = {
  error: "times",
  success: "check",
  warning: "exclamation-triangle",
};

const Alert = ({
  children,
  hide = false,
  style,
  type,
}: AlertProps): React.JSX.Element => {
  const [layout, handleLayout] = useLayout();
  const height = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(height, {
      duration: 300,
      toValue: hide ? 0 : layout.height,
      useNativeDriver: false,
    }).start();
  }, [height, hide, layout.height]);

  return (
    <Animated.View style={[style, styles.wrapper, styles[type], { height }]}>
      <View onLayout={handleLayout} style={styles.container}>
        <Icon name={icons[type]} size={14} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </Animated.View>
  );
};

export { Alert };
