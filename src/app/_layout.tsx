import { setButtonStyleAsync } from "expo-navigation-bar";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useTheme } from "@/core/theme";
import { logError } from "@/utils";

const RootLayout = (): React.JSX.Element => {
  const theme = useTheme();
  const barsStyle = theme === "dark" ? "light" : "dark";
  setButtonStyleAsync(barsStyle).catch(logError);

  return (
    <SafeAreaProvider>
      <StatusBar style={barsStyle} />
      <Slot />
    </SafeAreaProvider>
  );
};

export default RootLayout;
