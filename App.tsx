import "expo-dev-client";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "~/pages/Home";
import { Record } from "~/pages/Record";
import { Settings } from "~/pages/Settings";
import { EditWeeklyRecord } from "~/pages/EditWeeklyRecord";

import { HistoryIcon, HomeIcon, SettingIcon } from "~/components/Icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderColor, skyBlue } from "~/styles/color";

const Stack = createStackNavigator();

function RecordStacks() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Record'
				component={Record}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name='EditWeeklyRecord' component={EditWeeklyRecord} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<RecoilRoot>
					<Tab.Navigator>
						<Tab.Screen
							name='Home'
							component={Home}
							options={{
								tabBarLabel: "ホーム",
								tabBarLabelStyle: {
									fontSize: 12,
									fontWeight: "bold",
								},
								tabBarIcon: (parameter) => {
									return <HomeIcon color={parameter.focused ? skyBlue : undefined} />;
								},
								headerShown: false,
								tabBarActiveTintColor: skyBlue,
							}}
						/>
						<Tab.Screen
							name='RecordStacks'
							component={RecordStacks}
							options={{
								tabBarLabel: "記録",
								tabBarLabelStyle: {
									fontSize: 12,
									fontWeight: "bold",
								},
								tabBarIcon: (parameter) => {
									return <HistoryIcon color={parameter.focused ? skyBlue : undefined} />;
								},
								headerShown: false,
								tabBarActiveTintColor: skyBlue,
							}}
						/>
						<Tab.Screen
							name='Settings'
							component={Settings}
							options={{
								tabBarLabel: "設定",
								tabBarLabelStyle: {
									fontSize: 12,
									fontWeight: "bold",
								},
								tabBarIcon: (parameter) => {
									return <SettingIcon color={parameter.focused ? skyBlue : undefined} />;
								},
								headerShown: false,
								tabBarActiveTintColor: skyBlue,
							}}
						/>
					</Tab.Navigator>
				</RecoilRoot>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
