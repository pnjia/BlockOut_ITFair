import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/lib/useAuth";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "../../assets/images/google-icon.svg";

const Signin = () => {
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const isFormValid = useMemo(
    () => Boolean(email.trim() && password.trim()),
    [email, password]
  );

  const handleForgotPassword = useCallback(() => {
    router.push("/(auth)/forgotPassword");
  }, []);

  const handleSignin = useCallback(async () => {
    if (!isFormValid || loading) {
      setLocalError("Please enter both email and password.");
      return;
    }

    setLocalError(null);

    try {
      await login({
        email: email.trim(),
        password,
      });
      router.replace("/(dashboard)/blockout");
    } catch (err) {
      setLocalError(
        err instanceof Error
          ? err.message
          : "Failed to sign in. Please try again."
      );
    }
  }, [email, isFormValid, loading, login, password]);

  const handleSignup = useCallback(() => {
    router.push("/(auth)/signup");
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top", "left", "right"]}
    >
      <ViewStyle>
        <ViewStyle
          style={{
            width: "85%",
          }}
        >
          <TextStyle variant="h1" color="tertiary">
            Blockout
          </TextStyle>
          <Spacer height={10} />
          <TextStyle variant="h3" color="quarternary">
            Enter your email and password to sign in
          </TextStyle>
          <Spacer height={40} />
          <TextStyle
            style={{ alignSelf: "flex-start" }}
            variant="h3"
            color="quarternary"
          >
            Email
          </TextStyle>
          <Spacer height={10} />
          <InputStyle
            placeholder="blockout@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <Spacer height={20} />
          <TextStyle
            style={{ alignSelf: "flex-start" }}
            variant="h3"
            color="quarternary"
          >
            Password
          </TextStyle>
          <Spacer height={10} />
          <InputStyle
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            autoComplete="password"
          />
          <Spacer height={20} />
          <Pressable
            style={{ alignSelf: "flex-end" }}
            onPress={handleForgotPassword}
          >
            <TextStyle variant="body" color="tertiary">
              Forgot Password?
            </TextStyle>
          </Pressable>
          <Spacer height={20} />
          <RetroButton
            style={{ width: "100%", opacity: loading ? 0.6 : 1 }}
            title={loading ? "Signing in..." : "Sign In"}
            onPress={loading ? undefined : handleSignin}
          />
          <Spacer height={20} />
          <TextStyle variant="body" color="quarternary">
            Or
          </TextStyle>
          <Spacer height={20} />
          <Pressable
            style={{
              width: "100%",
              borderColor: Colors.quarternary,
              borderWidth: 1.5,
              paddingVertical: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}
            >
              <GoogleIcon width={24} height={24} />
              <TextStyle
                style={{ textAlign: "center", marginLeft: 8 }}
                variant="h3"
                color="quarternary"
              >
                Sign In with Google
              </TextStyle>
            </View>
          </Pressable>
          <Spacer height={20} />

          {(localError || error) && (
            <TextStyle
              variant="body"
              color="#be1a1aff"
              style={{ marginTop: 16, textAlign: "center" }}
            >
              {localError || error}
            </TextStyle>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextStyle variant="body" color="quarternary">
              Don&apos;t have an account?{" "}
            </TextStyle>
            <Pressable onPress={handleSignup}>
              <TextStyle variant="body" color="tertiary">
                Sign Up
              </TextStyle>
            </Pressable>
          </View>
          <Spacer height={20} />
          {/* <RetroButton
            title="Personalize"
            onPress={() => router.push("/(personalize)")}
          /> */}
        </ViewStyle>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Signin);
