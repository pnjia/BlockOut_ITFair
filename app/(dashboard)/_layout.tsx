import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";

const DashboardLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,

          tabBarStyle: {
            backgroundColor: Colors.primary,
            paddingBottom: 6,
            paddingTop: 4,
            height: 65,
            borderTopWidth: 0,
            elevation: 0,
          },

          tabBarItemStyle: {
            paddingVertical: 0,
          },

          tabBarLabelStyle: {
            marginTop: 4,
            fontSize: 12,
          },

          tabBarActiveTintColor: Colors.tertiary,
          tabBarInactiveTintColor: Colors.quarternary,

          tabBarIcon: ({ color, focused }) => {
            // ====== KHUSUS TAB BLOCKOUT (pakai MaterialIcons) ======
            if (route.name === "blockout") {
              return (
                <MaterialIcons
                  name="block"
                  size={24}
                  color={color}
                  style={{ marginBottom: -2 }}
                />
              );
            }

            // ====== ICON UNTUK TAB LAIN (pakai Ionicons) ======
            let iconName: string = "ellipse-outline";

            switch (route.name) {
              case "avatar":
                iconName = focused ? "person" : "person-outline";
                break;
              case "shop":
                iconName = focused ? "cart" : "cart-outline";
                break;
              case "settings":
                iconName = focused ? "settings" : "settings-outline";
                break;
            }

            return (
              <Ionicons
                name={iconName as any}
                size={24}
                color={color}
                style={{ marginBottom: -2 }}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="blockout" options={{ title: "Blockout" }} />
        <Tabs.Screen name="avatar" options={{ title: "Avatar" }} />
        <Tabs.Screen name="shop" options={{ title: "Shop" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </>
  );
};

export default DashboardLayout;
