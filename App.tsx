import "expo-dev-client";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "~/pages/Home";
import { Sheet } from "~/pages/Sheet";
import { Settings } from "~/pages/Settings";
import { HistoryIcon, HomeIcon, SettingIcon } from "~/components/Icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
	const Tab = createBottomTabNavigator();

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<RecoilRoot>
					<Tab.Navigator>
						<Tab.Screen
							name='ホーム'
							component={Home}
							options={{
								tabBarIcon: () => {
									return <HomeIcon />;
								},
								headerShown: false,
							}}
						/>
						<Tab.Screen
							name='記録の管理'
							component={Sheet}
							options={{
								tabBarIcon: () => {
									return <HistoryIcon />;
								},
								headerShown: false,
							}}
						/>
						<Tab.Screen
							name='設定'
							component={Settings}
							options={{
								tabBarIcon: () => {
									return <SettingIcon />;
								},
								headerShown: false,
							}}
						/>
					</Tab.Navigator>
				</RecoilRoot>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
