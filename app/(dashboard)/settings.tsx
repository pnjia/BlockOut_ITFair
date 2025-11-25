import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const Settings = () => {
  const handleAccountPress = () => {
    // Handle account settings press
    router.navigate("/(account)/account");
  };
  const handleNotificationsPress = () => {
    // Handle notifications settings press
  };
  const handleWorkoutPress = () => {
    // Handle workout preferences press
  };
  const handleLogoutPress = () => {
    // Handle logout press
  };
  return (
    <ViewStyle>
      <View
        style={{
          width: "85%",
          height: "100%",
          justifyContent: "flex-start",
          paddingTop: 60,
          paddingBottom: 60,
        }}
      >
        <TextStyle variant="h1" color="tertiary">
          Settings
        </TextStyle>

        <Spacer height={40} />

        <View style={{ width: "100%", rowGap: 20 }}>
          <Pressable onPress={handleAccountPress}>
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
                <Ionicons
                  name="person-outline"
                  size={40}
                  color={Colors.quarternary}
                />
                <TextStyle variant="h2" color="quarternary">
                  Account
                </TextStyle>
              </View>
              <Ionicons
                name="chevron-forward-sharp"
                size={30}
                color={Colors.quarternary}
              />
            </View>
          </Pressable>

          <Pressable onPress={handleNotificationsPress}>
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
                <Ionicons
                  name="notifications-outline"
                  size={40}
                  color={Colors.quarternary}
                />
                <TextStyle variant="h2" color="quarternary">
                  Notifications
                </TextStyle>
              </View>
              <Ionicons
                name="chevron-forward-sharp"
                size={30}
                color={Colors.quarternary}
              />
            </View>
          </Pressable>

          <Pressable onPress={handleWorkoutPress}>
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
                <Ionicons
                  name="barbell-outline"
                  size={40}
                  color={Colors.quarternary}
                />
                <TextStyle variant="h2" color="quarternary">
                  Workout Preferences
                </TextStyle>
              </View>
              <Ionicons
                name="chevron-forward-sharp"
                size={30}
                color={Colors.quarternary}
              />
            </View>
          </Pressable>

          <Pressable onPress={handleLogoutPress}>
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
                <SimpleLineIcons
                  name="logout"
                  size={40}
                  color={Colors.quarternary}
                />
                <TextStyle variant="h2" color="quarternary">
                  Logout
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

export default Settings;
