import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const StackLayout = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
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
      </Stack>
    </View>
  );
};

export default StackLayout;
