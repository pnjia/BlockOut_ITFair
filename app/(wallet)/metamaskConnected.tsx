import Header from "@/components/Header";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MetamaskIcon from "../../assets/images/metamask.svg";

const MetamaskConnected = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "85%",
            height: "100%",
            paddingTop: 20,
          }}
        >
          <Header />

          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Spacer height={100} />
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.quarternary,
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                paddingHorizontal: 100,
                paddingVertical: 10,
              }}
            >
              <MetamaskIcon width={100} height={100} />
              <TextStyle variant="h2" color="tertiary">
                Metamask
              </TextStyle>
              <TextStyle variant="body" color="quarternary">
                Connected as 0x12...ab
              </TextStyle>
            </View>
            <RetroButton title="Disconnect" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MetamaskConnected;
