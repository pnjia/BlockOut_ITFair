import InputStyle from "@/components/InputStyle";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

const Blockout = () => {
  return (
    <ViewStyle style={{ justifyContent: "flex-start", paddingTop: 60 }}>
      <View style={{ width: "85%", alignItems: "center" }}>
        <TextStyle variant="h1" color="tertiary">
          Select Apps to Block
        </TextStyle>

        <Spacer height={20} />

        <View style={{ position: "relative", width: "100%" }}>
          <InputStyle
            placeholder="Search for an app"
            style={{
              width: "100%",
              backgroundColor: "#393E46",
              borderWidth: 0,
            }}
          />

          <Pressable
            style={{
              position: "absolute",
              right: 10,
              top: 8,
            }}
          >
            <Entypo
              name="magnifying-glass"
              size={24}
              color={Colors.quarternary}
            />
          </Pressable>
        </View>
      </View>
    </ViewStyle>
  );
};

export default Blockout;
