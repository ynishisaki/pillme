import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Home: undefined;
	EditWeeklyRecord: undefined;
	Settings: undefined;
	Feed: { sort: "latest" | "top" } | undefined;
};

export type ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Home" | "Settings" | "EditWeeklyRecord"
>;
