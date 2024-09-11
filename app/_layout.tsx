import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { RecoilRoot } from "recoil";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<RecoilRoot>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
					<Stack.Screen name='initial-settings' options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
		</RecoilRoot>
	);
}
