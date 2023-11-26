import "expo-dev-client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "~/navigation/AppNavigation";

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<RecoilRoot>
					<AppNavigation />
				</RecoilRoot>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
