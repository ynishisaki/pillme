import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./src/pages/Home";
import { Settings } from "./src/pages/Settings";
import { EditWeeklyRecord } from "./src/pages/EditWeeklyRecord";
import { TouchableOpacity } from "react-native";
import { SettingIcon } from "~/atoms/Icons";

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
