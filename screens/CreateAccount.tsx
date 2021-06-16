import React, { useRef, useEffect } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";
import { Props } from "../types";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount (
    $userName: String!
    $email:    String!
    $password:String!
    $name:String!
    $location:String!
  ) {
    createAccount (
      userName : $userName
      email : $email
      password : $password
      name : $name
      location : $location
    ) {
      ok
      error
    }
  }
`;


export default function CreateAccount({ navigation }: Props<"CreateAccount">) {
  const { register, handleSubmit, setValue, watch, setError, getValues } = useForm();
  
  const userNameRef = useRef(null);
  const nameRef = useRef(null);
  const location = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    register("userName", { required: true });
    register("password", { required: true });
    register("name", { required: true });
    register("email", { required: true });
    register("location", { required: true });
    register("profile", { required: true });
  }, [register]);

  const onNext = (nextOne: React.RefObject<any>) => {
    nextOne?.current?.focus();
  };
  const onCompleted = (data: any) => {
    const { userName, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    console.log(data);
    
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: any) => {
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <TextInput
        ref={userNameRef}
        placeholder="UserName"
        autoCapitalize="none"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("userName", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="gray"
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="done"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(nameRef)}
        onChangeText={(text) => setValue("password", text)}
      />
      <TextInput
        ref={nameRef}
        placeholder="Name"
        placeholderTextColor="gray"
        autoCapitalize="none"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("name", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="gray"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(location)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={location}
        placeholder="Location"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
        onChangeText={(text) => setValue("location", text)}
      />
       <AuthButton
        text="Create Account"
        loading={loading}
        disabled={false}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}