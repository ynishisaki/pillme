import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRecoilValue } from "recoil";

import { Settings } from "~/pages/Settings";
import { recordState } from "~/states/recordState";
import { hasNoRecordDays } from "~/functions/countRecord";
import { HistoryIcon, HomeIcon, SettingIcon } from "~/components/Icons";
import { skyBlue } from "~/styles/color";
import { Record } from "~/pages/Record";
import HomeStacks from "./HomeStacks";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		<Tab.Navigator>
			<Tab.Screen
				name='HomeStacks'
				component={HomeStacks}
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
	);
}
