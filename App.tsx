import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "~/pages/Home";
import { Settings } from "~/pages/Settings";
import { EditWeeklyRecord } from "~/pages/EditWeeklyRecord";
import { TouchableOpacity } from "react-native";
import { SettingIcon } from "~/components/small/Icons";

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<RecoilRoot>
				<Stack.Navigator
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
				</Stack.Navigator>
			</RecoilRoot>
		</NavigationContainer>
	);
}
