import { ReactNode } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function ScreenContainer({ children }: { children: ReactNode }) {
	return (
		<ImageBackground source={require("@/assets/bgimage.png")} resizeMode='cover' style={styles.backgroundImage}>
			<View style={[styles.container]}>{children}</View>
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
