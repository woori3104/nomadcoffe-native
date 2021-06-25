import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_USER = gql`
  query searchUser($keyword: String!, $page: Int) {
    searchUser(keyword: $keyword, page: $page) {
      id
      userName
      email
      name
      location 
      avatarURL
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
const UserContainer = styled.View``;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
export default function SearchUser({ navigation }: {navigation:any}) {
  const numColumns = 4;
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_USER);
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
      placeholder="Search User"
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
  const renderSeeUser = ({ item:searchUser }: { item: any }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Profile", {
          username: searchUser.userName,
        })
      }
    >
      <UserContainer>
        <Username>{searchUser?.userName}</Username>
      </UserContainer>
      <Image
        source={{ uri: searchUser.avatarURL }}
        style={{ width: width / numColumns, height: 100 }} 
      />
    </TouchableOpacity>
  );
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
        {data?.searchUser !== undefined ? (
          data?.searchUser?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchUser}
              keyExtractor={(searchUser) => "" + searchUser.id}
              renderItem={renderSeeUser}
              
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}