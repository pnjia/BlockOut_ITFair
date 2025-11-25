import { Colors } from "@/constants/theme";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
      });
      setLoaded(true);
    }
    loadFonts();
  }, []);

  if (!loaded) return null;

  return (
    <>
      <StatusBar translucent={true} backgroundColor={Colors.primary} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="test" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
