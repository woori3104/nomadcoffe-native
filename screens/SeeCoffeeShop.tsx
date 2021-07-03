import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, View } from "react-native";
import { Props } from "../types";
import ScreenLayout from "../components/ScreenLayout";
import { ScrollView } from "react-native-gesture-handler";

const SEECOFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id:Int) {
    seeCoffeeShops(id:$id) {
      id
      name
      latitude
      longitude
      photos {
        id
        url
      }
      user {
        id
        userName
        avatarURL
      }
      categories {
        id
        name
      }
    }
  }
`;

export default function SeeCoffeeShop({ route }: Props<"SeeCoffeeShop">) {
  const { data, loading, refetch } = useQuery(SEECOFFEESHOP_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
    console.log(data);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.seePhoto?.caption && <SeeCoffeeShop {...data.seePhoto} />}
      </ScrollView>
    </ScreenLayout>
  );
}