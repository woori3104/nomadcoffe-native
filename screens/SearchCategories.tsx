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
import SeeCoffeeShop from "../components/SeeCoffeeShop";

const SEARCH_CATEGORIES = gql`
  query searchCategories($keyword: String!, $offset: Int) {
    searchCategories(keyword: $keyword, offset: $offset) {
      id
      name
      slub
      shops {
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

export default function searchCategories({ navigation }: {navigation:any}) {
  const numColumns = 4;
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_CATEGORIES);
  const onValid = ({ keyword }: { keyword: any }) => {
    console.log(keyword);
    startQueryFn({
      variables: {
        keyword,
        offset:0,
      },
    });
    console.log(data);
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="search Categories"
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
  const renderSeeCategories = ({ item:searchCategories }: { item: any }) => {
    console.log(searchCategories?.shops);
    return <SeeCoffeeShop {...searchCategories?.shops} />;
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
        {data?.searchCategories !== undefined ? (
          data?.searchCategories?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCategories}
              keyExtractor={(searchCategories) => "" + searchCategories.id}
              renderItem={renderSeeCategories}
              
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}