import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import "react-native-gesture-handler";
import MainTabs from "~/navigation/MainTabs";
import { FirstSettings } from "~/pages/FirstSettings";

const Stack = createStackNavigator();

export default function AppNavigation() {
	const [isFirstTime, setIsFirstTime] = useState(false); // trueだとロード画面から動かない

	// AsyncStorageから記録を取得
	const load = async () => {
		await AsyncStorage.getItem("record").then((result) => {
			console.log("RES: ", result);
			if (result == null) {
				setIsFirstTime(true);
			} else {
				setIsFirstTime(false);
			}
		});
	};

	return (
		<Stack.Navigator id='1' initialRouteName={isFirstTime ? "FirstSettings" : "MainTabs"}>
			<Stack.Screen
				name='FirstSettings'
				component={FirstSettings}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='MainTabs'
				component={MainTabs}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}
