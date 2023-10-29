import { ImageBackground, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScrollableScreenLayout({ children }: { children: React.ReactNode }) {
	const insets = useSafeAreaInsets();

	return (
		<ImageBackground source={require("../../assets/bgimage3.png")} resizeMode='cover' style={styles.bgimage}>
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
				<StatusBar barStyle='light-content' translucent={true} backgroundColor='rgba(0, 0, 0, 0)' />
				<ScrollView style={[styles.contentsLayout]}>{children}</ScrollView>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgimage: {
		flex: 1,
	},
	contentsLayout: {
		flex: 1,
		marginBottom: 16,
		paddingHorizontal: 16,
	},
});
