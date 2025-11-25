import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const ForgotPassword = () => {
  const handleSend = () => {
    router.push("/(auth)/resetPassword");
  };

  const handleBackLogin = () => {
    router.push("/(auth)/signin");
  };
  return (
    <ViewStyle>
      <View
        style={{
          width: "85%",
          height: "100%",
          paddingTop: 30,
          paddingBottom: 60,
          justifyContent: "flex-start",
        }}
      >
        <TextStyle variant="h3" color="tertiary">
          Enter your registered phone number. We’ll send you instructions to
          reset your password
        </TextStyle>

        <Spacer height={30} />
        <View>
          <TextStyle variant="h3" color="quarternary">
            Phone Number
          </TextStyle>
          <Spacer height={10} />
          <InputStyle placeholder="08123456789" keyboardType="phone-pad" />
        </View>
        <View style={{ flex: 1 }}></View>

        <View style={{ width: "100%" }}>
          <RetroButton title="Send" onPress={handleSend} />
          <Spacer height={20} />
          <Pressable style={{ alignSelf: "center" }} onPress={handleBackLogin}>
            <TextStyle variant="h3" color="tertiary">
              Back to Sign in
            </TextStyle>
          </Pressable>
        </View>
      </View>
    </ViewStyle>
  );
};

export default ForgotPassword;
