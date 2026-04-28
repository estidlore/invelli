import type { Theme } from "@react-navigation/native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "utils";

import { styles } from "./styles";
import type { ScreenProps } from "./types";

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.transparent,
  },
};

const Screen = ({ children }: ScreenProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingTop: insets.top,
        },
      ]}
    >
      <StatusBar backgroundColor={colors.dark} barStyle={"light-content"} />
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </View>
  );
};

export { Screen };
