import { gql } from "@apollo/client";

export const SEECOFFEESHOP = gql`
  fragment seeCoffeeShops on CoffeeShopX {
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
`;


export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isFollowing
    isMe
  }
`;
