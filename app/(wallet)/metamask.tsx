import Header from "@/components/Header";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import Fontisto from "@expo/vector-icons/Fontisto";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Metamaskicon from "../../assets/images/metamask.svg";

const Metamask = () => {
  const [checked, setChecked] = React.useState(false);

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
            <Pressable
              onPress={() => setChecked((c) => !c)}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 15,
              }}
            >
              {/* FIX: Bikin wrapper untuk kunci posisi ikon */}
              <View
                style={{
                  width: 24, // sama dengan icon size
                  height: 24,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Fontisto
                  name={checked ? "checkbox-active" : "checkbox-passive"}
                  color={Colors.tertiary}
                  size={24}
                />
              </View>

              <TextStyle variant="body" color="quarternary">
                I agree to MetaMask&apos;s{" "}
                <Pressable>
                  <TextStyle variant="body" color="tertiary">
                    Terms of use
                  </TextStyle>
                </Pressable>
              </TextStyle>
            </Pressable>

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
