import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StackLayout = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  const noPaddingStyle = {
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingTop: insets.top,
  };

  return (
    <Stack
      screenOptions={{
        animation: "fade",
        contentStyle: {
          paddingBottom: insets.bottom + 16,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
          paddingTop: insets.top + 8,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name={"items/[id]"} />
      <Stack.Screen name={"items/[id]/edit"} />
      <Stack.Screen name={"items/new"} />
      <Stack.Screen name={"onboarding"} />
      <Stack.Screen name={"scanner"} options={{ contentStyle: noPaddingStyle }} />
      <Stack.Screen name={"transactions/[id]"} />
      <Stack.Screen name={"transactions/[id]/edit"} />
      <Stack.Screen name={"transactions/[id]/add-items"} />
    </Stack>
  );
};

export default StackLayout;
