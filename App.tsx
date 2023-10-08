import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "~/pages/Home";
import { Sheet } from "~/pages/Sheet";
import { Settings } from "~/pages/Settings";
import { EditWeeklyRecord } from "~/pages/EditWeeklyRecord";
import { TouchableOpacity } from "react-native";
import { HistoryIcon, HomeIcon, SettingIcon } from "~/components/small/Icons";

export default function App() {
	const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();

	return (
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
				{/* <Stack.Navigator
					screenOptions={{
						// タスク：設定画面はtitleをつける
						title: "",
						headerTransparent: true,
						headerBlurEffect: "systemUltraThinMaterial",
					}}
					initialRouteName='Home'>
					<Stack.Screen
						name='Home'
						component={Home}
						options={({ navigation }) => ({
							headerRight: () => (
								<TouchableOpacity
									onPress={() => {
										navigation.navigate("Settings");
									}}>
									<SettingIcon />
								</TouchableOpacity>
							),
						})}
					/>
					<Stack.Screen name='Settings' component={Settings} />
					<Stack.Screen
						name='EditWeeklyRecord'
						component={EditWeeklyRecord}
					/>
				</Stack.Navigator> */}
			</RecoilRoot>
		</NavigationContainer>
	);
}
