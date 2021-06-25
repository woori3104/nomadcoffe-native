import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SearchUser from "../screens/SearchUser";
import SearchCoffeeShop from "../screens/SearchCoffeeShop";
import SearchCategories from "../screens/SearchCategories";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function SearchNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: "black",
        },
        activeTintColor: "white",
        indicatorStyle: {
          backgroundColor: "white",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="SearchUser">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="SearchUser" component={SearchUser} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="SearchCoffeeShop">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="SearchCoffeeShop" component={SearchCoffeeShop} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="SearchCategories">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="SearchCategories" component={SearchCategories} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
