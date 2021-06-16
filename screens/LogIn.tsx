import React, { useEffect, useRef } from "react";
import { Props } from "../types";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function LogIn({ route: { params } }: Props<"LogIn">) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      userName: params?.userName,
    },
  });
  const passwordRef = useRef(null);
  const onCompleted = async (data: any) => {
    const {
      login: { ok, token },
    } = data;
    console.log(data);
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne: React.RefObject<any>) => {
    nextOne?.current?.focus();
  };
  const onValid = (data: any) => {
    console.log(data);
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
    useEffect(() => {
    register("userName", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        value={watch("userName")}
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("userName", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="next"
        placeholderTextColor="gray"
        lastOne={true}
        style={{ backgroundColor: "white", width: "100%" }}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton text="Log In" 
        loading={loading}
        disabled={false}
        onPress={handleSubmit(onValid)} />
    </AuthLayout> 
  );
}