import { recordType } from "@/types/record";

// 3日連続で出血しているが、24日連続投与していないので、休薬しない
export const testDataOne: recordType = {
	dailyRecord: [
		{
			date: "2023-01-04",
			tookMedicine: false,
			haveBleeding: false,
			isRestPeriod: false,
		},
		// 3日連続出血
		{
			date: "2023-01-03",
			tookMedicine: true,
			haveBleeding: true,
			isRestPeriod: false,
		},
		{
			date: "2023-01-02",
			tookMedicine: true,
			haveBleeding: true,
			isRestPeriod: false,
		},
		{
			date: "2023-01-01",
			tookMedicine: true,
			haveBleeding: true,
			isRestPeriod: false,
		},
	],
	initialSheetSettings: {
		minConteniousTakingDays: 24,
		maxConteniousTakingDays: 120,
		conteniousBleeingDaysForRest: 3,
		stopTakingDays: 4,
		numOfPillsPerSheet: 28,
		beginSheetIndex: 0,
	},
	isAsyncStorageLoaded: false,
};
