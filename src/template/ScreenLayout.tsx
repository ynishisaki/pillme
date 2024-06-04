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
import { StyleSheet, View } from "react-native";
import ScreenContainer from "~/template/ScreenContainer";

SplashScreen.preventAutoHideAsync();

export default function ScreenLayout({ children }: { children: React.ReactNode }) {
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
		<ScreenContainer>
			<View style={styles.contentsLayout} onLayout={onLayoutRootView}>
				{children}
			</View>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginVertical: 32,
		marginHorizontal: 32,
	},
});
