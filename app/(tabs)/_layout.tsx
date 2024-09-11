import { HistoryIcon, HomeIcon, SettingIcon } from "@/components/common/Icons";
import { Colors } from "@/constants/Colors";
import { hasNoRecordDays } from "@/functions/countRecord";
import { useColorScheme } from "@/hooks/useColorScheme";
import { recordState } from "@/states/recordState";
import { softBlue } from "@/styles/color";
import { Tabs } from "expo-router";
import { useRecoilValue } from "recoil";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}>
			<Tabs.Screen
				name='index'
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
					tabBarBadge: !hasNoRecordWithoutToday && hasNoRecordToday ? "!" : undefined,
				}}
			/>
			<Tabs.Screen
				name='records'
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
					tabBarBadge: hasNoRecordWithoutToday ? "!" : undefined,
				}}
			/>
			<Tabs.Screen
				name='settings'
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
		</Tabs>
	);
}
