export type recordType = {
	initialSheetSettings: initialSheetSettingsType;
	dailyRecord: Array<dailyRecordType>;
	isAsyncStorageLoaded: boolean;
	isInitialSettingsDone: boolean;
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
