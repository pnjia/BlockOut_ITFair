import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const authLayout = () => {
  return (
    <>
      {/* make the status bar follow the auth background (dark) */}
      <StatusBar translucent={true} backgroundColor={Colors.primary} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.primary,
          },
          navigationBarColor: Colors.primary,
          animation: "fade",
          animationDuration: 50,
          freezeOnBlur: true,
        }}
      >
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgotPassword" />
        <Stack.Screen name="resetPassword" />
      </Stack>
    </>
  );
};

export default React.memo(authLayout);
