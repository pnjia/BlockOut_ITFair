import { Colors } from "@/constants/theme";
import React from "react";
import { View, ViewProps } from "react-native";

const ViewStyle = ({ style, ...props }: ViewProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primary,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ViewStyle;
