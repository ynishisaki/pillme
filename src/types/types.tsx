import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
	Home: undefined;
	Profile: { userId: string };
	Feed: { sort: "latest" | "top" } | undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

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
}
