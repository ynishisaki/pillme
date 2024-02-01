import {
	NotoSansJP_100Thin,
	NotoSansJP_300Light,
	NotoSansJP_400Regular,
	NotoSansJP_500Medium,
	NotoSansJP_700Bold,
	NotoSansJP_900Black,
	useFonts,
} from "@expo-google-fonts/noto-sans-jp";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { RecoilRoot } from "recoil";
// import { useFonts } from "expo-font";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		NotoSansJP_100Thin,
		NotoSansJP_300Light,
		NotoSansJP_400Regular,
		NotoSansJP_500Medium,
		NotoSansJP_700Bold,
		NotoSansJP_900Black,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (fontError) throw fontError;
	}, [fontError]);

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<RecoilRoot>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen
						name='(tabs)'
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</ThemeProvider>
		</RecoilRoot>
	);
}
