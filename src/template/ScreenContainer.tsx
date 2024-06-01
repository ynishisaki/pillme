import {
	NotoSansJP_100Thin,
	NotoSansJP_300Light,
	NotoSansJP_400Regular,
	NotoSansJP_500Medium,
	NotoSansJP_700Bold,
	NotoSansJP_900Black,
	useFonts,
} from "@expo-google-fonts/noto-sans-jp";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function ScreenContainer({ children }: { children: React.ReactNode }) {
	const insets = useSafeAreaInsets();

	const [fontsLoaded, fontError] = useFonts({
		NotoSansJP_100Thin,
		NotoSansJP_300Light,
		NotoSansJP_400Regular,
		NotoSansJP_500Medium,
		NotoSansJP_700Bold,
		NotoSansJP_900Black,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<ImageBackground source={require("../../assets/bgimage.png")} resizeMode='cover' style={styles.backgroundImage}>
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
				{/* <View style={styles.contentsLayout} onLayout={onLayoutRootView}> */}
				{children}
				{/* </View> */}
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
	// contentsLayout: {
	// 	flex: 1,
	// 	paddingHorizontal: 32,
	// },
	contentsLayout: {
		flex: 1,
		marginBottom: 16,
		marginHorizontal: 16,
		alignItems: "center",
		flexDirection: "column",
	},
});
