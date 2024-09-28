import { recordType } from "@/types/record";

// 3日連続出血かつ、連続投与24日以上のため休薬する
export const testDataTwo: recordType = {
	dailyRecord: [
		// 今日の記録はまだ
		{
			date: "2023-01-25",
			tookMedicine: false,
			haveBleeding: false,
			isRestPeriod: false,
		},
		// 3日連続出血
		{
			date: "2023-01-24",
			tookMedicine: true,
			haveBleeding: true,
			isRestPeriod: false,
		},
		{
			date: "2023-01-23",
			tookMedicine: true,
			haveBleeding: true,
			isRestPeriod: false,
		},
		{
			date: "2023-01-22",
			tookMedicine: true,
			haveBleeding: true,
			isRestPeriod: false,
		},
		{
			date: "2023-01-21",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-20",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-19",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-18",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-17",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-16",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-15",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-14",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-13",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-12",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-11",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-10",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-09",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-08",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-07",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-06",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-05",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-04",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-03",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-02",
			tookMedicine: true,
			haveBleeding: false,
			isRestPeriod: false,
		},
		{
			date: "2023-01-01",
			tookMedicine: true,
			haveBleeding: false,
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
	isInitialSettingsDone: false,
};
