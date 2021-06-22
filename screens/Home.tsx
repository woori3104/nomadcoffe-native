import { Props } from "../types";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import SeeCoffeeShop from "../components/SeeCoffeeShop";

const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset:Int) {
    seeCoffeeShops(offset:$offset) {
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

export default function Home({ navigation }: Props<"Home">) {

  const { data, loading, refetch, fetchMore } = useQuery(SEECOFFEESHOPS_QUERY, {
    variables: {
      offset: 1,
    },
  });
  console.log(data);
  const [refreshing, setRefreshing] = useState(false);
  const refresh  = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderSeeCoffeeShop = ({ item:coffeeShop }: { item: any }) => {
    console.log(coffeeShop);
    return <SeeCoffeeShop {...coffeeShop} />;
  };
   return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderSeeCoffeeShop}
      />
    </ScreenLayout>
  );
}


