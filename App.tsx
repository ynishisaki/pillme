import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import AppNavigation from "~/navigation/AppNavigation";

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<RecoilRoot>
					<AppNavigation />
				</RecoilRoot>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
