import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../Account/Account.screen";
import HomeScreen from "../Home/Home.screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "native-base";
import AccountStack from "../Stacks/AccountStack";

const Tab = createBottomTabNavigator();

type IconName = "home" | "home-outline" | "account" | "account-outline";
export default function BottomTab() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName: IconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Account Stack") {
            iconName = focused ? "account" : "account-outline";
          } else {
            iconName = focused ? "home" : "home-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={32}
              color={theme.colors.cyan[600]}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Account Stack" component={AccountStack} />
    </Tab.Navigator>
  );
}
