import { enableFreeze, enableScreens } from "react-native-screens";

try {
  enableScreens(false);
  enableFreeze(false);
} catch (error) {
  console.warn("Failed to disable react-native-screens optimizations:", error);
}

import "expo-router/entry";
