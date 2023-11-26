import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRecoilValue } from "recoil";

import RecordStacks from "./RecordStacks";
import { Home } from "~/pages/Home";
import { Settings } from "~/pages/Settings";
import { recordState } from "~/states/recordState";
import { hasNoRecordDays } from "~/functions/countRecord";
import { HistoryIcon, HomeIcon, SettingIcon } from "~/components/Icons";
import { skyBlue } from "~/styles/color";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
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
					tabBarBadge: hasNoRecordWithoutToday || hasNoRecordToday ? "!" : undefined,
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
