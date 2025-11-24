import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Link } from "expo-router";

export default function Index() {
  return (
    <ViewStyle>
      <TextStyle>Percobaan</TextStyle>
      <Link href="/(auth)/signin">Signin</Link>
    </ViewStyle>
  );
}
