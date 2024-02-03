import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRecoilValue } from "recoil";

import { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { HistoryIcon, HomeIcon, SettingIcon } from "~/components/Icons";
import { hasNoRecordDays } from "~/functions/countRecord";
import { FirstSettings } from "~/pages/FirstSettings";
import { Record } from "~/pages/Record";
import { Settings } from "~/pages/Settings";
import { recordState } from "~/states/recordState";
import { skyBlue } from "~/styles/color";
import HomeStacks from "./HomeStacks";

const Tab = createBottomTabNavigator();

// const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

export default function AppNavigation() {
	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	// AsyncStorageから記録を取得
	useEffect(() => {
		(async () => {
			const storedRecordAsString: string | null = await AsyncStorage.getItem("record");

			// AsyncStorageに記録がないので、デフォルトのrecordを利用する
			if (storedRecordAsString === null) {
				// return setIsFirstTime(true);
			} else {
				// return setIsFirstTime(false);
			}
		})();
		// 上記の括弧をつけることで即時関数を実行
	}, []);

	return (
		<Tab.Navigator
		// isFirstTimeがtrueなら、FirstSettingsを表示
		// initialRouteName={isFirstTime ? "FirstSettings" : "HomeStacks"}
		// initialRouteName='FirstSettings'
		>
			{/* <Tab.Screen
				name='FirstSettings'
				component={FirstSettings}
				options={{
					headerShown: false,
				}}
			/> */}
			<Tab.Screen
				name='HomeStacks'
				component={HomeStacks}
				options={{
					tabBarLabel: "ホーム",
					tabBarLabelStyle: {
						fontSize: 12,
						lineHeight: 14,
						fontFamily: "NotoSansJP_400Regular",
					},
					tabBarIcon: (parameter) => {
						return <HomeIcon color={parameter.focused ? skyBlue : undefined} />;
					},
					headerShown: false,
					tabBarActiveTintColor: skyBlue,
					tabBarBadge: hasNoRecordToday || hasNoRecordWithoutToday ? "!" : undefined,
				}}
			/>
			<Tab.Screen
				name='Record'
				component={Record}
				options={{
					tabBarLabel: "記録",
					tabBarLabelStyle: {
						fontSize: 12,
						lineHeight: 14,
						fontFamily: "NotoSansJP_400Regular",
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
						lineHeight: 14,
						fontFamily: "NotoSansJP_400Regular",
					},
					tabBarIcon: (parameter) => {
						return <SettingIcon color={parameter.focused ? skyBlue : undefined} />;
					},
					headerShown: false,
					tabBarActiveTintColor: skyBlue,
				}}
			/>
		</Tab.Navigator>
	);
}
