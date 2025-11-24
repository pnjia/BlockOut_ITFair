import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import TextStyle from "./TextStyle";

// 1. Kita definisikan tipe data untuk Props
interface RetroButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  buttonColor?: string;
  style?: StyleProp<ViewStyle>; // Supaya bisa menerima custom style dari luar
}

const RetroButton: React.FC<RetroButtonProps> = ({
  title = "Log In",
  onPress,
  buttonColor = Colors.tertiary,
  style,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={[style]}>
      {/* Layer Bayangan Hitam (Shadow) */}
      <View style={styles.shadowLayer} />

      {/* Layer Tombol Utama */}
      <Pressable
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[
          styles.buttonLayer,
          { backgroundColor: buttonColor },
          isPressed && styles.buttonPressed,
        ]}
      >
        <TextStyle variant="h3" color={Colors.quarternary}>
          {title}
        </TextStyle>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowLayer: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    zIndex: -1,
  },
  buttonLayer: {
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
  },
  buttonPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
});

export default RetroButton;
