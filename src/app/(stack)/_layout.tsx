import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { commonStyles } from "@/core/theme";

const StackLayout = (): React.JSX.Element => {
  return (
    <SafeAreaView style={commonStyles.grow}>
      <Stack
        screenOptions={{
          animation: "fade",
          contentStyle: { padding: 16 },
          headerShown: false,
        }}
      >
        <Stack.Screen name={"items/[id]"} />
        <Stack.Screen name={"items/[id]/edit"} />
        <Stack.Screen name={"items/new"} />
        <Stack.Screen name={"onboarding"} />
        <Stack.Screen name={"scanner"} options={{ contentStyle: { padding: 0 } }} />
        <Stack.Screen name={"transactions/[id]"} />
        <Stack.Screen name={"transactions/[id]/edit"} />
        <Stack.Screen name={"transactions/[id]/add-items"} />
      </Stack>
    </SafeAreaView>
  );
};

export default StackLayout;
