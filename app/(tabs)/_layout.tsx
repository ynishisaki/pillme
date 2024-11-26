import { TabBarIcon } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { hasNoRecordDays } from "@/functions/countRecord";
import { useColorScheme } from "@/hooks/useColorScheme";
import { recordState } from "@/states/recordState";
import { Tabs, usePathname } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useRecoilValue } from "recoil";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const record = useRecoilValue(recordState);
  const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // ホーム画面or初期設定画面 アプリを終了する
        if (pathname === "/" || pathname === "/initial-settings") {
          BackHandler.exitApp();
          return true;
        }
        // 通常の戻るボタンの挙動
        return false;
      }
    );

    return () => backHandler.remove();
  }, [pathname]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "ホーム",
          tabBarLabelStyle: {
            fontSize: 10,
            lineHeight: 12,
            fontFamily: "NotoSansJP_400Regular",
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
          headerShown: false,
          tabBarBadge:
            !hasNoRecordWithoutToday && hasNoRecordToday ? "!" : undefined,
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          tabBarLabel: "記録",
          tabBarLabelStyle: {
            fontSize: 10,
            lineHeight: 12,
            fontFamily: "NotoSansJP_400Regular",
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
            />
          ),
          headerShown: false,
          tabBarBadge: hasNoRecordWithoutToday ? "!" : undefined,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "設定",
          tabBarLabelStyle: {
            fontSize: 10,
            lineHeight: 12,
            fontFamily: "NotoSansJP_400Regular",
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
