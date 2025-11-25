import HeaderDashboard from "@/components/HeaderDashboard";
import ViewStyle from "@/components/ViewStyle";
import React from "react";
import { View } from "react-native";

const Shop = () => {
  return (
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
  );
};

export default Shop;
