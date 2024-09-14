import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { hasNoRecordDays } from "@/functions/countRecord";
import { useColorScheme } from "@/hooks/useColorScheme";
import { recordState } from "@/states/recordState";
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
						fontSize: 10,
						lineHeight: 12,
						fontFamily: "NotoSansJP_400Regular",
					},
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
					),
					headerShown: false,
					tabBarBadge: !hasNoRecordWithoutToday && hasNoRecordToday ? "!" : undefined,
				}}
			/>
			<Tabs.Screen
				name='records'
				options={{
					tabBarLabel: "記録",
					tabBarLabelStyle: {
						fontSize: 10,
						lineHeight: 12,
						fontFamily: "NotoSansJP_400Regular",
					},
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={color} />
					),
					headerShown: false,
					tabBarBadge: hasNoRecordWithoutToday ? "!" : undefined,
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					tabBarLabel: "設定",
					tabBarLabelStyle: {
						fontSize: 10,
						lineHeight: 12,
						fontFamily: "NotoSansJP_400Regular",
					},
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? "settings" : "settings-outline"} color={color} />
					),
					headerShown: false,
				}}
			/>
		</Tabs>
	);
}
