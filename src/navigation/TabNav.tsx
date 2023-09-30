import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { InventoryScreen } from "views/Inventory";
import { SalesScreen } from "views/Sales";
import { SettingsScreen } from "views/Settings";

const Tab = createBottomTabNavigator();
const options: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveBackgroundColor: "#fff1",
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: "transparent",
  },
};

const TabNav = (): JSX.Element => {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        component={InventoryScreen}
        name={"Inventory"}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name={"box"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={SalesScreen}
        name={"Sales"}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name={"money-bill"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={SettingsScreen}
        name={"Settings"}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name={"cog"} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { TabNav };
