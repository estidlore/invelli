import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/Icon";
import { useColors } from "@/core/theme";

const TabsLayout = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.bg,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingTop: insets.top,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.bg2,
          borderColor: colors.bg3,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name={"inventory"}
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name={"inventory"} size={24} />,
        }}
      />
      <Tabs.Screen
        name={"sales"}
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name={"dollar"} size={24} />,
        }}
      />
      <Tabs.Screen
        name={"settings"}
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name={"settings"} size={24} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
