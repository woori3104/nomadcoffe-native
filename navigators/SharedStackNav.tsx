import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import Home from "../screens/Home";
import SearchCoffeeShop from "../screens/SearchCoffeeShop";
import Me from "../screens/Me";
import Profile from "../screens/Me";


const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }:{ screenName : string}) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name={"Home"}
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "SearchCoffeeShop" ? (
        <Stack.Screen name={"SearchCoffeeShop"} component={SearchCoffeeShop} />
          ) : null}
        {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}