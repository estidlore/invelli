import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { setButtonStyleAsync } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { QueryFallback, Toast } from "@/components";
import { createTranslations, useTranslation } from "@/core/language";
import { commonStyles, useColors, useTheme } from "@/core/theme";
import { db, migrations } from "@/db";
import { logError } from "@/utils";

const translations = createTranslations({
  ENG: {
    dbMigrationError: "Database migration error",
  },
  SPA: {
    dbMigrationError: "Error de migración de base de datos",
  },
});

const RootLayout = (): React.JSX.Element => {
  const theme = useTheme();
  const barsStyle = theme === "dark" ? "light" : "dark";
  setButtonStyleAsync(barsStyle).catch(logError);

  const { error, success } = useMigrations(db, migrations);
  const t = useTranslation(translations);
  const colors = useColors();
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
  };

  if (error || !success) {
    return <QueryFallback error={error} errorMsg={t.dbMigrationError} isPending={!success} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={barsStyle} />
      <ThemeProvider value={appTheme}>
        <View style={[commonStyles.grow, { backgroundColor: colors.background }]}>
          <Stack screenOptions={{ animation: "fade", headerShown: false }}>
            <Stack.Screen name={"(tabs)"} />
            <Stack.Screen name={"(stack)"} />
          </Stack>
          <Toast />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
