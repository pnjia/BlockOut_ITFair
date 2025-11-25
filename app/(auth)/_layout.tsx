import { Colors, FontSizes, GlobalStyles } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const authLayout = () => {
  return (
    <>
      {/* make the status bar follow the auth background (dark) */}
      <StatusBar translucent={true} backgroundColor={Colors.primary} />
      <Stack>
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen
          name="forgotPassword"
          options={{
            headerTitle: "Forgot Password",
            headerTitleStyle: {
              fontSize: FontSizes.h2,

              fontFamily: GlobalStyles.fontRegular,
            },
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerShadowVisible: false,
            headerTintColor: Colors.tertiary,
          }}
        />
        <Stack.Screen
          name="resetPassword"
          options={{
            headerTitle: "Reset Password",
            headerTitleStyle: {
              fontSize: FontSizes.h2,

              fontFamily: GlobalStyles.fontRegular,
            },
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerShadowVisible: false,
            headerTintColor: Colors.tertiary,
          }}
        />
      </Stack>
    </>
  );
};

export default authLayout;
