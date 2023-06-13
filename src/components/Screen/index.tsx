import type { Theme } from "@react-navigation/native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar } from "react-native";

import { colors } from "utils/colors";

import { styles } from "./styles";
import type { ScreenProps } from "./types";

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.transparent
  }
};

const Screen = ({ children }: ScreenProps): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.dark} barStyle={"light-content"} />
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </SafeAreaView>
  );
};

export { Screen };
