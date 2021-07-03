import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../color";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
const CREATE_COFFESHOP_MUTATION = gql`
  mutation createCoffeeShop (
    $name: String!
    $latitude: String!
    $longitude:longitude!
    $photos:[Upload]
    $categories:[String]
  ) {
        createCoffeeShop (
        name : $name
        latitude : $latitude
        longitude : $longitude
        photos : $photos
        categories : $categories
        ) {
            ok
            error
        }
    }                      
`;  
const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
  margin-bottom:15px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }: { route: any, navigation: any }) {
   const { register, handleSubmit, setValue, setError, getValues } = useForm();

   const [createCoffeeShopMutation, { loading, error }] = useMutation(
    CREATE_COFFESHOP_MUTATION
  );
    
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
    );
  const name = useRef(null);
  const latitude = useRef(null);
  const longitude = useRef(null);
  const categories = useRef(null);

  useEffect(() => {
    register("name", { required: true });
    register("latitude", { required: true });
    register("longitude", { required: true });
    register("categories", { required: false });
    navigation.setOptions({
       headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [register, loading]);
  const onNext = (nextOne: React.RefObject<any>) => {
    nextOne?.current?.focus();
  };
  const onValid = ({ name,latitude,longitude,categories}:{ name:string,latitude:string,longitude:string,categories:string}) => {
    const photos = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    console.log(photos); 
    console.log("test");
    createCoffeeShopMutation({
      variables: {
          name,
          latitude,
          longitude,
          photos,
          categories,
      },
    });
    };
  console.log(route.params.file);
  console.log(error);
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
                placeholder="Write a name..."
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                onSubmitEditing={() => onNext(latitude)}
                onChangeText={(text) => setValue("name", text)}
            />
          <Caption
                placeholder="Write a latitude..."
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                onSubmitEditing={() => onNext(longitude)}
                onChangeText={(text) => setValue("latitude", text)}
          />
          <Caption
                placeholder="Write a longitude..."
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                onSubmitEditing={() => onNext(categories)}
                onChangeText={(text) => setValue("longitude", text)}
          />
          <Caption
                returnKeyType="done"
                placeholder="Write a categories..."
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("categories", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}