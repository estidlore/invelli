import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { commonStyles } from "@/core/theme";

const StackLayout = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        commonStyles.grow,
        {
          paddingBottom: insets.bottom + 16,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
          paddingTop: insets.top + 16,
        },
      ]}
    >
      <Stack screenOptions={{ animation: "fade", headerShown: false }}>
        <Stack.Screen name={"item-form"} />
        <Stack.Screen name={"scanner"} />
        <Stack.Screen name={"transaction-detail"} />
      </Stack>
    </View>
  );
};

export default StackLayout;
