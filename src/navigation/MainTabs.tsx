import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRecoilValue } from "recoil";
import { HistoryIcon, HomeIcon, SettingIcon } from "~/components/common/Icons";
import { hasNoRecordDays } from "~/functions/countRecord";
import { Home } from "~/pages/Home";
import { Record } from "~/pages/Record";
import { Settings } from "~/pages/Settings";
import { recordState } from "~/states/recordState";
import { softBlue } from "~/styles/color";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
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
						lineHeight: 14,
						fontFamily: "NotoSansJP_400Regular",
					},
					tabBarIcon: (parameter) => {
						return <HomeIcon color={parameter.focused ? softBlue : undefined} />;
					},
					headerShown: false,
					tabBarActiveTintColor: softBlue,
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
						return <HistoryIcon color={parameter.focused ? softBlue : undefined} />;
					},
					headerShown: false,
					tabBarActiveTintColor: softBlue,
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
						return <SettingIcon color={parameter.focused ? softBlue : undefined} />;
					},
					headerShown: false,
					tabBarActiveTintColor: softBlue,
				}}
			/>
		</Tab.Navigator>
	);
}
