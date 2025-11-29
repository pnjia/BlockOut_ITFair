import InputStyle from "@/components/InputStyle";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Entypo } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AppConfig = {
  id: string;
  name: string;
  packageName: string;
  blocked: boolean;
};

const DEFAULT_APPS: AppConfig[] = [
  {
    id: "instagram",
    name: "Instagram",
    packageName: "com.instagram.android",
    blocked: false,
  },
  {
    id: "tiktok",
    name: "TikTok",
    packageName: "com.zhiliaoapp.musically",
    blocked: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    packageName: "com.google.android.youtube",
    blocked: false,
  },
  {
    id: "facebook",
    name: "Facebook",
    packageName: "com.facebook.katana",
    blocked: false,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    packageName: "com.twitter.android",
    blocked: false,
  },
  {
    id: "netflix",
    name: "Netflix",
    packageName: "com.netflix.mediaclient",
    blocked: false,
  },
];

const Blockout = () => {
  const [search, setSearch] = useState("");
  const [apps, setApps] = useState<AppConfig[]>(DEFAULT_APPS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppConfig | null>(null);

  const filteredApps = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      return apps;
    }

    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(keyword) ||
        app.packageName.toLowerCase().includes(keyword)
    );
  }, [apps, search]);

  const handleToggleBlock = useCallback((id: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  }, []);

  const handleOpenApp = useCallback((app: AppConfig) => {
    if (app.blocked) {
      setSelectedApp(app);
      setModalVisible(true);
      return;
    }

    console.log(`Launching ${app.name}`);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedApp(null);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top"]}
    >
      <ViewStyle style={{ justifyContent: "flex-start", paddingTop: 60 }}>
        <View style={{ width: "85%", alignItems: "center" }}>
          <TextStyle variant="h1" color="tertiary">
            Select Apps to Block
          </TextStyle>

          <Spacer height={20} />

          <View style={{ position: "relative", width: "100%" }}>
            <InputStyle
              placeholder="Search for an app"
              style={{
                width: "100%",
                backgroundColor: "#393E46",
                borderWidth: 0,
              }}
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View
              style={{
                position: "absolute",
                right: 10,
                top: 8,
              }}
            >
              <Entypo
                name="magnifying-glass"
                size={24}
                color={Colors.quarternary}
              />
            </View>
          </View>

          <Spacer height={30} />

          <FlatList
            data={filteredApps}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              width: "100%",
              gap: 16,
              paddingBottom: 32,
            }}
            renderItem={({ item }) => (
              <View style={styles.appRow}>
                <Pressable
                  onPress={() => handleOpenApp(item)}
                  style={styles.appInfo}
                >
                  <TextStyle variant="h3" color="tertiary">
                    {item.name}
                  </TextStyle>
                  <TextStyle variant="body" color="quarternary">
                    {item.packageName}
                  </TextStyle>
                  {item.blocked ? (
                    <TextStyle
                      variant="body"
                      color="#ff6b6b"
                      style={{ marginTop: 6 }}
                    >
                      Currently blocked
                    </TextStyle>
                  ) : null}
                </Pressable>

                <Pressable
                  onPress={() => handleToggleBlock(item.id)}
                  style={[
                    styles.toggleButton,
                    item.blocked ? styles.toggleOn : styles.toggleOff,
                  ]}
                >
                  <TextStyle
                    variant="body"
                    color={item.blocked ? Colors.quarternary : Colors.primary}
                  >
                    {item.blocked ? "Turn On" : "Disable"}
                  </TextStyle>
                </Pressable>
              </View>
            )}
            ListEmptyComponent={
              <TextStyle
                variant="body"
                color="quarternary"
                style={{ textAlign: "center" }}
              >
                No apps match your search.
              </TextStyle>
            }
          />
        </View>
      </ViewStyle>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <TextStyle
              variant="h2"
              color="tertiary"
              style={{ textAlign: "center" }}
            >
              Apps Locked!
            </TextStyle>
            <Spacer height={16} />
            <Entypo name="lock" size={48} color={Colors.quarternary} />
            <Spacer height={16} />
            <TextStyle
              variant="body"
              color="quarternary"
              style={{ textAlign: "center" }}
            >
              {selectedApp
                ? `${selectedApp.name} is currently unavailable. You must do some exercise first.`
                : "You must do some exercise first."}
            </TextStyle>
            <Spacer height={24} />
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <TextStyle variant="body" color={Colors.primary}>
                Close
              </TextStyle>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(Blockout);

const styles = StyleSheet.create({
  appRow: {
    width: "100%",
    backgroundColor: "#1C2029",
    borderWidth: 1,
    borderColor: Colors.quarternary,
    padding: 16,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  appInfo: {
    flex: 1,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.quarternary,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleOff: {
    backgroundColor: Colors.quarternary,
  },
  toggleOn: {
    backgroundColor: "#1C2029",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#1C2029",
    borderWidth: 1,
    borderColor: Colors.quarternary,
    padding: 24,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: Colors.tertiary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
});
