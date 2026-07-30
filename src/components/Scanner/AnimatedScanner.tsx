import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useColors } from "@/core/theme";

import { Scanner } from ".";
import { styles } from "./styles";
import type { ScannerProps } from "./types";

const AnimatedScanner = ({ onScan, style }: Omit<ScannerProps, "children">): React.JSX.Element => {
  const colors = useColors();
  const flashProgress = useSharedValue(0);
  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: flashProgress.value,
  }));

  const handleScan = (barcode: string): void => {
    flashProgress.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 350 }),
    );

    onScan(barcode);
  };

  return (
    <Scanner onScan={handleScan} style={[styles.rounded, style]}>
      <Animated.View
        pointerEvents={"none"}
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: colors.textSuccess },
          animatedOverlayStyle,
        ]}
      />
    </Scanner>
  );
};

export { AnimatedScanner };
