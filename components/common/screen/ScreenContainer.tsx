import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenContainer({ children }: { children: ReactNode }) {
	const insets = useSafeAreaInsets();

	return (
		<ImageBackground source={require("@/assets/bgimage.png")} resizeMode='cover' style={styles.backgroundImage}>
			<View
				style={[
					styles.container,
					{
						paddingTop: insets.top,
						paddingBottom: insets.bottom,
						paddingLeft: insets.left,
						paddingRight: insets.right,
					},
				]}>
				<StatusBar style='light' />
				{children}
			</View>
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
