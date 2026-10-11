import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColors } from "@/core/theme";

import type { AppProvidersProps } from "./types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const AppProviders = ({ children }: AppProvidersProps): React.JSX.Element => {
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
      <ThemeProvider value={appTheme}>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>{children}</KeyboardProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export { AppProviders };
