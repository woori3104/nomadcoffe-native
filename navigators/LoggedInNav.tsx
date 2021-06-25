import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TapsNav";
import SearchNav from "./SearchNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Search" component={SearchNav} />
    </Stack.Navigator>
  )
};