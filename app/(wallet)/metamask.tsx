import Header from "@/components/Header";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Metamaskicon from "../../assets/images/metamask.svg";

const Metamask = () => {
  const handleCreateWalletPress = React.useCallback(() => {
    router.push({
      pathname: "/(wallet)/metamaskConnected",
    });
  }, []);
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

          <Spacer height={40} />

          <View
            style={{ flexDirection: "column", alignItems: "center", gap: 20 }}
          >
            <TextStyle variant="h2" color="tertiary">
              Let&apos;s get started
            </TextStyle>
            <TextStyle
              variant="body"
              color="quarternary"
              style={{ textAlign: "center" }}
            >
              Trusted by millions, MetaMask is a secure wallet making the world
              of web3 accessible to all
            </TextStyle>

            <Metamaskicon width={100} height={100} />

            <View style={{ width: "100%", flexDirection: "row", gap: 15 }}>
              <Ionicons name="checkbox-outline" size={24} />
              <TextStyle variant="body" color="quarternary">
                I agree to MetaMask&apos;s
                <Pressable>
                  <TextStyle variant="body" color="tertiary">
                    Terms of use
                  </TextStyle>
                </Pressable>
              </TextStyle>
            </View>

            <RetroButton
              title="Create a new wallet"
              onPress={handleCreateWalletPress}
              style={{ width: "100%" }}
            />
            <RetroButton
              title="Import an existing wallet"
              buttonTextColor="tertiary"
              buttonColor={Colors.quarternary}
              borderColor={Colors.tertiary}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Metamask;
