import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Link, router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/signin"); // arahkan ke halaman login
    }, 2500); // 2.5 detik

    return () => clearTimeout(timer);
  }, []);
  return (
    <ViewStyle>
      <TextStyle>Percobaan</TextStyle>
      <Link href="/(auth)/signin">Signin</Link>
      <Link href="/(auth)/signup">Signup</Link>
      <Link href="/test">Test</Link>
    </ViewStyle>
  );
}
