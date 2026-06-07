import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { setButtonStyleAsync } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Text } from "@/components";
import { useColors, useTheme } from "@/core/theme";
import { db, migrations } from "@/db";
import { logError } from "@/utils";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
  },
});

const RootLayout = (): React.JSX.Element => {
  const theme = useTheme();
  const barsStyle = theme === "dark" ? "light" : "dark";
  setButtonStyleAsync(barsStyle).catch(logError);

  const { success, error } = useMigrations(db, migrations);
  const colors = useColors();
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
  };

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{`Migration error: ${error.message}`}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

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
