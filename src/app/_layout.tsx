import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { setButtonStyleAsync } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColors, useTheme } from "@/core/theme";
import { logError } from "@/utils";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

const RootLayout = (): React.JSX.Element => {
  const theme = useTheme();
  const barsStyle = theme === "dark" ? "light" : "dark";
  setButtonStyleAsync(barsStyle).catch(logError);

  const colors = useColors();
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar style={barsStyle} />
      <ThemeProvider value={appTheme}>
        <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
          <Stack screenOptions={{ animation: "fade", headerShown: false }}>
            <Stack.Screen name={"(tabs)"} />
            <Stack.Screen name={"(stack)"} />
          </Stack>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
