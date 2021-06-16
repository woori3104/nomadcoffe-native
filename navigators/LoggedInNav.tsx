import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import SeeCoffeeShops from "../screens/seeCoffeeShop";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="SeeCoffeeShops" component={SeeCoffeeShops} />
    </Tabs.Navigator>
  );
}