import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "../components/nav/TapsNav";
const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
    </Stack.Navigator>
  );
}