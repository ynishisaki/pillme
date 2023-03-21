import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Home: undefined;
	EditWeeklyRecord: { userId: string };
	InitialSettings: { userId: string };
	Feed: { sort: "latest" | "top" } | undefined;
};

export type ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Home" | "InitialSettings" | "EditWeeklyRecord"
>;

export type recordType = {
	initialSheetInitialSettings: initialSheetInitialSettingsType;
	dailyRecord: Array<dailyRecordType>;
	isAsyncStorageLoaded: boolean;
};

export interface initialSheetInitialSettingsType {
	numOfPillsPerSheet: number;
	beginSheetIndex: number;
}

export interface dailyRecordType {
	date: string;
	tookMedicine: boolean;
	haveBleeding: boolean;
	isRestPeriod: boolean;
}
