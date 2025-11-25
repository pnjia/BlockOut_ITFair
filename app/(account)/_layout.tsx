import { Stack } from "expo-router";
import React from "react";

const AccountLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Account" }} />
      <Stack.Screen name="editProfile" options={{ title: "Edit Profile" }} />
      <Stack.Screen
        name="deleteAccount"
        options={{ title: "Delete Account" }}
      />
    </Stack>
  );
};

export default AccountLayout;
