import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TapsNav";
import SearchNav from "./SearchNav";
import UploadNav from "./UploadNav";
import { Ionicons } from "@expo/vector-icons";
import UploadForm from "../screens/UploadForm";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
     <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={SearchNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  )
};