import { Props } from "../types";
import React from "react";
import { Text, View } from "react-native";

export default function SeeCoffeeShops({ navigation }: Props<"SeeCoffeeShops">) {
    return (
        <View
            style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <Text style={{ color: "white" }}>Feed</Text>
        </View>
  );
}

