import { Props } from "../types";
import React from "react";
import { Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";

const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($page:Int) {
    seeCoffeeShops(page:$page) {
      id
      name
      latitude
      longitude
      photos {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
`;

export default function SeeCoffeeShops({ navigation }: Props<"SeeCoffeeShops">) {
    const { data } = useQuery(SEECOFFEESHOPS_QUERY, { variables: { page: 1 } });
    let items = data?.seeCoffeeShops.map((item: any) => (
        console.log(item)));
            <Text style={{ color: "white" }}>{ items?.name}</Text>


    return (
        <View
            style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            { items }
        </View>
  );
}

