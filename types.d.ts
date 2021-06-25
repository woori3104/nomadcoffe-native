import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyledInterface } from "styled-components";

export type RootStackParamList = {
  Welcome: undefined;
  LogIn: { userName: string; password: string } | undefined;
  CreateAccount: { usernName: string; password: string; email: string; name: string; location: string } | undefined;
  Home: undefined
  Profile: { userName: string; } | undefined
  ME: undefined
  EditProfile: undefined
  SeeCoffeeShop: {id:number} | undefined

};

export type Props<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
};
