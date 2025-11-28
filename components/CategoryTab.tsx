import { FontSizes, GlobalStyles } from "@/constants/theme";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

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
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={[
              styles.btn,
              {
                borderColor: activeTab === tab ? activeColor : textColor,
                backgroundColor: inactiveColor,
              },
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
      </ScrollView>

      {children && <View style={styles.content}>{children(activeTab)}</View>}
    </View>
  );
};

export default React.memo(CategoryTab);

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    minHeight: 40,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  btn: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: GlobalStyles.fontRegular,
    fontSize: FontSizes.h4,
  },
  textActive: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
});
