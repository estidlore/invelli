import React from "react";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import { Text } from "@/components/Text";
import type { Theme } from "@/core/theme";
import { useColors } from "@/core/theme";

import { useToastStore } from "./store";
import type { ToastType } from "./store";
import { styles } from "./styles";

const BG_COLOR_BY_TYPE: Record<ToastType, keyof Theme> = {
  error: "bgError",
  info: "bgInfo",
  neutral: "background",
  success: "bgSuccess",
  warning: "bgWarning",
};

const TEXT_COLOR_BY_TYPE: Record<ToastType, keyof Theme> = {
  error: "textError",
  info: "textInfo",
  neutral: "text",
  success: "textSuccess",
  warning: "textWarning",
};

const Toast = (): React.JSX.Element | null => {
  const toast = useToastStore((state) => state.toast);
  const colors = useColors();

  if (!toast) return null;

  return (
    <Animated.View
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)}
      pointerEvents={"none"}
      style={styles.toast}
    >
      <Text
        style={[
          styles.text,
          {
            backgroundColor: colors[BG_COLOR_BY_TYPE[toast.type]],
            borderColor: colors[TEXT_COLOR_BY_TYPE[toast.type]],
            color: colors[TEXT_COLOR_BY_TYPE[toast.type]],
          },
        ]}
        type={"small"}
      >
        {toast.message}
      </Text>
    </Animated.View>
  );
};

export * from "./store";
export { Toast };
