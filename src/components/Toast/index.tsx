import React from "react";
import { View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import type { Theme } from "@/core/theme";
import { useColors } from "@/core/theme";

import { useToastStore } from "./store";
import { styles } from "./styles";
import type { ToastType } from "./types";

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
  const hideToast = useToastStore((state) => state.hideToast);
  const colors = useColors();

  if (!toast) return null;

  const color = TEXT_COLOR_BY_TYPE[toast.type];

  return (
    <Animated.View
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)}
      pointerEvents={"box-none"}
      style={styles.toast}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: colors[BG_COLOR_BY_TYPE[toast.type]],
            borderColor: colors[color],
          },
        ]}
      >
        <Text color={color} type={"small"}>
          {toast.message}
        </Text>
        <Button color={color} icon={"xmark"} iconSize={18} onPress={hideToast} />
      </View>
    </Animated.View>
  );
};

export type * from "./types";
export * from "./useToast";
export { Toast };
