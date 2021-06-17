import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import SeeCoffeeShops from "../screens/SeeCoffeeShops";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
      <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: false,
        style: {
          borderTopColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="SeeCoffeeShops"
        component={SeeCoffeeShops}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}