import React, { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import { gql } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const UserContainer = styled.View``;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const CategoryView = styled.View``;
const Cafename = styled.Text`
  color: white;
`;
const File = styled.Image``;

const ExtraContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.View``;
const CaptionText = styled.Text`
  color: white;
`;
function SeeCoffeeShop({ id, name, photos, categories, user }: { id:number, name:string, photos:any, categories:any, user:any}) {
    console.log(user);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const goToProfile = () => {
    navigation.navigate("Profile", {
        username: user.userName,
        id: user.id,
    });
  }

      
  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user?.avatarURL }} />
        <UserContainer>
          <Username>{user?.userName}</Username>
          <Cafename>{name}</Cafename>
        </UserContainer>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: height - 550,
        }}
        source={{ uri: photos[0]?.url }}
      />
      <ExtraContainer>
        <Caption>
            <Username>Catetories:</Username>
            {categories.map((item:any, index:number) => (
            <CategoryView key={index}>
                <CaptionText>{item.name}</CaptionText>
            </CategoryView>
        ))}
        </Caption>
      </ExtraContainer>
    </Container>
  );
}

export default SeeCoffeeShop;