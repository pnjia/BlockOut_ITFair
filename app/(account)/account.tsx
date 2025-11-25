import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const AccountIndex = () => {
  const handleAccountPress = () => {
    // navigate to editProfile inside account group
    router.navigate("/(account)/editProfile");
  };

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
                <TextStyle variant="h2" color="quarternary">
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
        </View>
      </View>
    </ViewStyle>
  );
};

export default AccountIndex;
