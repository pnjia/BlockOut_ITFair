import { FontSizes, GlobalStyles } from "@/constants/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

interface CategoryTabProps {
  tabs?: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
  children?: (activeTab: string) => React.ReactNode;
}

const CategoryTab: React.FC<CategoryTabProps> = ({
  tabs = ["Top", "Shirt", "Pants", "Bottom"],
  defaultTab,
  onTabChange,
  activeColor = "#00bfa5",
  inactiveColor = "#1e1e2e",
  textColor = "#fff",
  containerStyle,
  children,
}) => {
  // State untuk menyimpan tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Bagian Navigasi (Segmented Control) */}
      <View style={styles.navContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={[
              styles.btn,
              { borderColor: activeTab === tab ? activeColor : textColor },
              // Ubah style jika tab ini yang sedang aktif
              activeTab === tab && {
                backgroundColor: activeColor,
                borderColor: activeColor,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: textColor },
                activeTab === tab && styles.textActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Konten di bawahnya berubah sesuai state */}
      {children && <View style={styles.content}>{children(activeTab)}</View>}
    </View>
  );
};

export default React.memo(CategoryTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  btn: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: GlobalStyles.fontRegular,
    fontSize: FontSizes.h3,
  },
  textActive: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
});
