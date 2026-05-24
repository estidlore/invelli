import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColors } from "@/core/theme";

const RootLayout = (): React.JSX.Element => {
  const colors = useColors();

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.bg,
          },
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
};

export default RootLayout;
