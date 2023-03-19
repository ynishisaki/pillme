import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Home: undefined;
	WeeklyRecordDetails: { userId: string };
	InitialSettings: { userId: string };
	Feed: { sort: "latest" | "top" } | undefined;
};

export type ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Home" | "InitialSettings" | "WeeklyRecordDetails"
>;

export type recordType = {
	initialSheetSettings: initialSheetSettingsType;
	dailyRecord: Array<dailyRecordType>;
	isAsyncStorageLoaded: boolean;
};

export interface initialSheetSettingsType {
	numOfPillsPerSheet: number;
	beginSheetIndex: number;
}

export interface dailyRecordType {
	date: string;
	tookMedicine: boolean;
	haveBleeding: boolean;
	isRestPeriod: boolean;
}
