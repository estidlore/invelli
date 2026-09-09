import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { setButtonStyleAsync } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import "react-native-reanimated";

import { AppProviders, QueryFallback, Toast } from "@/components";
import { createTranslations, useTranslation } from "@/core/language";
import { commonStyles, useColors, useTheme } from "@/core/theme";
import { db, migrations } from "@/db";
import { OnboardingGuard } from "@/screens/onboarding/Guard";
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

  if (error || !success) {
    return <QueryFallback error={error} errorMsg={t.dbMigrationError} isPending={!success} />;
  }

  return (
    <AppProviders>
      <StatusBar style={barsStyle} />
      <View style={[commonStyles.grow, { backgroundColor: colors.background }]}>
        <OnboardingGuard />
        <Stack screenOptions={{ animation: "fade", headerShown: false }}>
          <Stack.Screen name={"(tabs)"} />
          <Stack.Screen name={"(stack)"} />
        </Stack>
        <Toast />
      </View>
    </AppProviders>
  );
};

export default RootLayout;
