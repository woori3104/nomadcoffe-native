import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Props } from "../types";

export default function Profile({ navigation, route }:{navigation: any, route: any }) {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>

        
      </Text>
    </View>
  );
}