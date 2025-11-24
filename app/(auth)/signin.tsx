import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import React from "react";
import { Pressable, View } from "react-native";
import GoogleIcon from "../../assets/images/google-icon.svg";

const Signin = () => {
  return (
    <ViewStyle>
      <ViewStyle
        style={{
          width: "85%",
        }}
      >
        <TextStyle variant="h1" color="tertiary">
          Blockout
        </TextStyle>

        <Spacer height={10} />
        <TextStyle variant="h3" color="quarternary">
          Enter your email and password to sign in
        </TextStyle>

        <Spacer height={40} />

        <TextStyle
          style={{ alignSelf: "flex-start" }}
          variant="h3"
          color="quarternary"
        >
          Email
        </TextStyle>

        <Spacer height={10} />

        <InputStyle placeholder="blockout@gmail.com" />

        <Spacer height={20} />

        <TextStyle
          style={{ alignSelf: "flex-start" }}
          variant="h3"
          color="quarternary"
        >
          Password
        </TextStyle>

        <Spacer height={10} />

        <InputStyle placeholder="********" />

        <Spacer height={20} />

        <TextStyle
          style={{ alignSelf: "flex-end" }}
          variant="body"
          color="tertiary"
        >
          Forgot Password?
        </TextStyle>

        <Spacer height={20} />

        <RetroButton
          style={{ width: "100%" }}
          title="Sign In"
          onPress={() => {}}
        />

        <Spacer height={20} />

        <TextStyle variant="body" color="quarternary">
          Or
        </TextStyle>

        <Spacer height={20} />

        <Pressable
          style={{
            width: "100%",
            borderColor: Colors.quarternary,
            borderWidth: 1.5,
            paddingVertical: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
          >
            <GoogleIcon width={24} height={24} />
            <TextStyle
              style={{ textAlign: "center", marginLeft: 8 }}
              variant="h3"
              color="quarternary"
            >
              Sign In with Google
            </TextStyle>
          </View>
        </Pressable>
      </ViewStyle>
    </ViewStyle>
  );
};

export default Signin;
