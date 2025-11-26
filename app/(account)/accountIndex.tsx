import Header from "@/components/Header";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const AccountIndex = () => {
  const handleEditProfilePress = () => {
    // navigate to editProfile inside account group
    router.push("/(account)/editProfile");
  };

  const handleChangePasswordPress = () => {
    // navigate to changePassword inside account group
    router.push("/(account)/changePassword");
  };

  const handleDeleteAccountPress = () => {
    // navigate to deleteAccount inside account group
    router.push("/(account)/deleteAccount");
  };

  const handleBack = React.useCallback(() => {
    // Navigate back to settings tab in dashboard immediately
    router.push("/(dashboard)/settings");
  }, []);

  return (
    <ViewStyle>
      <View
        style={{
          width: "85%",
          paddingTop: 60,
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <Header title="Account" showBack={true} onBack={handleBack} />
        <View style={{ width: "100%", rowGap: 10 }}>
          <Pressable onPress={handleEditProfilePress}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 15,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <TextStyle variant="h3" color="quarternary">
                  Edit Profile
                </TextStyle>
              </View>
              <Ionicons
                name="chevron-forward-sharp"
                size={30}
                color={Colors.quarternary}
              />
            </View>
          </Pressable>

          <Pressable onPress={handleChangePasswordPress}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 15,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextStyle variant="h3" color="quarternary">
                  Change Password
                </TextStyle>
              </View>
              <Ionicons
                name="chevron-forward-sharp"
                size={30}
                color={Colors.quarternary}
              />
            </View>
          </Pressable>

          <Pressable onPress={handleDeleteAccountPress}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 15,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextStyle variant="h3" color="quarternary">
                  Delete Account
                </TextStyle>
              </View>
              <Ionicons
                name="chevron-forward-sharp"
                size={30}
                color={Colors.quarternary}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </ViewStyle>
  );
};

export default AccountIndex;
