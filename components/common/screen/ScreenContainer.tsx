import { ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenContainer({ children }: { children: ReactNode }) {
  return (
    <ImageBackground
      source={require("@/assets/bgimage.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={[styles.container]}>{children}</SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
