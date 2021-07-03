import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import CoffeeShop from "../components/CoffeeShop";

const SEARCH_COFFESHOP = gql`
  query searchCoffeeShop($keyword: String!, $offset: Int) {
    searchCoffeeShop(keyword: $keyword, offset: $offset) {
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
const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput<{ width: number }>`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function SearchCoffeeShop({ navigation }: {navigation:any}) {
  const numColumns = 4;
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_COFFESHOP);
  const onValid = ({ keyword }: { keyword: any }) => {
    console.log(keyword);
    startQueryFn({
      variables: {
        keyword,
      },
    });
    console.log(data);
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="Search coffeeShop"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);
  const { width, height } = useWindowDimensions();
  const renderSeeCoffeeShop = ({ item:coffeeShop }: { item: any }) => {
    console.log(coffeeShop);
    return <CoffeeShop {...coffeeShop} />;
  };
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShop !== undefined ? (
          data?.searchCoffeeShop?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCoffeeShop}
              keyExtractor={(searchCoffeeShop) => "" + searchCoffeeShop.id}
              renderItem={renderSeeCoffeeShop}
              
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}