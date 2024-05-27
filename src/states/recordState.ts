import { atom, selector } from "recoil";
import { getDateStrings } from "~/functions/getDateStrings";
import { dailyRecordType, recordType } from "~/types/record";

export const today = getDateStrings(new Date()); // YYYY-DD-MM

export const initialRecord: recordType = {
	initialSheetSettings: {
		// 投薬方法に関する設定
		minConteniousTakingDays: 24,
		maxConteniousTakingDays: 120,
		conteniousBleeingDaysForRest: 3,
		stopTakingDays: 4,
		// シートの管理
		numOfPillsPerSheet: 28,
		beginSheetIndex: 0, // 0スタート
	},
	dailyRecord: [
		{
			date: today,
			tookMedicine: false, // 今日薬を飲んだか
			haveBleeding: false, // 今日出血があったか
			isRestPeriod: false, // 休薬日か
		},
	],
	isAsyncStorageLoaded: false,
};

export const recordState = atom({
	key: "recordState",
	default: initialRecord,
});

export const recordStatusSelector = selector({
	key: "recordStatusSelector",
	get: ({ get }) => {
		const record = get(recordState);

		return {};
	},
});

// initialRecordから計算されるstate
interface monthlyRecordType {
	[yearMonth: string]: [
		// {
		// 	index: number; // record.dailyRecordのindexに対応
		// 	date: string;
		// 	tookMedicine: boolean;
		// 	haveBleeding: boolean;
		// 	isRestPeriod: boolean;
		// }
		dailyRecordType & { index: number }
	];
}
export const monthlyRecordState = selector({
	key: "monthlyRecord",
	get: ({ get }) => {
		const record = get(recordState);
		const monthlyRecord: monthlyRecordType = {};

		record.dailyRecord.forEach((dailyRecord, index) => {
			// 今日の記録は表示しない
			if (index === 0) return;

			const yearMonth = dailyRecord.date.slice(0, 7);
			const currentRecord = record.dailyRecord[index];

			if (!monthlyRecord[yearMonth]) {
				monthlyRecord[yearMonth] = [{ index: index, ...currentRecord }];
				return;
			}

			monthlyRecord[yearMonth].push({ index: index, ...currentRecord });
		});

		const oldestYearMonthIndex = Object.keys(monthlyRecord).length - 1;

		return monthlyRecord;
	},
});

export const generatePastRecord = (numOfDays: number): recordType => {
	if (numOfDays < 1) return initialRecord;

	const record = initialRecord;
	let dailyRecord = [] as dailyRecordType[];

	for (let i = 0; i < numOfDays; i++) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		dailyRecord.push({
			date: getDateStrings(date),
			tookMedicine: i === 0 ? false : true, // 今日の記録はfalse
			haveBleeding: false,
			isRestPeriod: false,
		});
	}
	return {
		...record,
		dailyRecord: dailyRecord,
	};
};
