import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import {
  Avatar,
  Title,
  Text,
  Caption,
} from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../color";
import { logUserOut } from "../apollo";

const Me_QUERY = gql`
   query me {
    me {
      userName
      email
      name
      location
      avatarURL
    }
  }
`;

export default function Profile({ navigation, route }: { navigation: any, route: any }) {
  const { data } = useQuery(Me_QUERY);

  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);

  const goToEditProfile = () => navigation.navigate("EditProfile");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: data?.me?.avatarURL ?  data?.me?.avatarURL : "../assets/avatar.png" ,
            }}
            size={150}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
           }]}>{data?.me?.name }</Title>
            <Caption style={styles.caption}>@{data?.me?.userName }</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Ionicons iconName="map-marker-radius" color="white" size={20}/>
          <Text style={{color:"white", marginLeft: 20}}>Location : {data?.me?.location }</Text>
        </View>
        <View style={styles.row}>
          <Ionicons iconName="phone" color="#white" size={20}/>
          <Text style={{color:"white", marginLeft: 20}}>email : {data?.me?.email }</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={logUserOut}>
          <LoginOut>Log Out</LoginOut>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToEditProfile}>
          <LoginOut>EditProfile</LoginOut>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const LoginOut = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 10px;
  margin-top: 20px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color:"white",
  },
  caption: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
    color:"white",
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    color:"white",
  },
});