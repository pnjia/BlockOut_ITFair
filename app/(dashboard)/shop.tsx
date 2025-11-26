import HeaderDashboard from "@/components/HeaderDashboard";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Shop = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top"]}
    >
      <ViewStyle>
        <View
          style={{
            width: "85%",
            height: "100%",
            paddingTop: 60,
            paddingBottom: 60,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <HeaderDashboard />
        </View>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Shop);
