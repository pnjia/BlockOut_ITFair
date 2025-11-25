import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";

import React, { useState } from "react";
import { Platform, Pressable, View } from "react-native";

const Signup = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "ios") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSignin = () => {
    router.push("/(auth)/signin");
  };

  return (
    <ViewStyle>
      <ViewStyle style={{ width: "85%" }}>
        <TextStyle variant="appTitle" color="tertiary">
          Signup
        </TextStyle>

        <Spacer height={20} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextStyle variant="h3" color="quarternary">
            Already have an account?
          </TextStyle>

          <Pressable style={{ marginLeft: 5 }} onPress={handleSignin}>
            <TextStyle variant="h3" color="tertiary">
              Sign in
            </TextStyle>
          </Pressable>
        </View>

        <Spacer height={20} />

        <View style={{ width: "100%", flexDirection: "row", columnGap: 15 }}>
          <View style={{ flex: 1 }}>
            <TextStyle variant="h3" color="quarternary">
              First Name
            </TextStyle>
            <Spacer height={10} />
            <InputStyle placeholder="Thomas" />
          </View>

          <View style={{ flex: 1 }}>
            <TextStyle variant="h3" color="quarternary">
              Last Name
            </TextStyle>
            <Spacer height={10} />
            <InputStyle placeholder="Shelby" />
          </View>
        </View>

        <Spacer height={20} />

        <TextStyle
          style={{ alignSelf: "flex-start" }}
          variant="h3"
          color="quarternary"
        >
          Email
        </TextStyle>

        <Spacer height={10} />

        <InputStyle placeholder="blockout@gmail.com" />

        <TextStyle
          style={{
            alignSelf: "flex-start",
            marginTop: 20,
          }}
          variant="h3"
          color="quarternary"
        >
          Birth of Date
        </TextStyle>

        <Spacer height={10} />

        <Pressable
          style={{ width: "100%" }}
          onPress={() => setShowPicker(true)}
        >
          <InputStyle
            style={{ width: "100%" }}
            pointerEvents="none"
            editable={false}
            value={date.toDateString()}
          />
        </Pressable>

        {showPicker && Platform.OS !== "web" && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
          />
        )}
        <Spacer height={20} />

        <TextStyle
          style={{ alignSelf: "flex-start" }}
          variant="h3"
          color="quarternary"
        >
          Phone Number
        </TextStyle>

        <Spacer height={10} />

        <InputStyle placeholder="08123456789" keyboardType="phone-pad" />

        <Spacer height={20} />

        <TextStyle
          style={{ alignSelf: "flex-start" }}
          variant="h3"
          color="quarternary"
        >
          Set Password
        </TextStyle>

        <Spacer height={10} />

        <InputStyle placeholder="********" />

        <Spacer height={30} />

        <RetroButton style={{ width: "100%" }} title="Sign up" />
      </ViewStyle>
    </ViewStyle>
  );
};

export default Signup;
