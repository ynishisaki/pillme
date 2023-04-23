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

export type recordType = {
	initialSheetSettings: initialSheetSettingsType;
	dailyRecord: Array<dailyRecordType>;
	isAsyncStorageLoaded: boolean;
};

export interface initialSheetSettingsType {
	minConteniousTakingDays: number;
	maxConteniousTakingDays: number;
	conteniousBleeingDaysForRest: number;
	stopTakingDays: number;
	numOfPillsPerSheet: number;
	beginSheetIndex: number;
}

export interface dailyRecordType {
	date: string;
	tookMedicine: boolean;
	haveBleeding: boolean;
	isRestPeriod: boolean;
}
