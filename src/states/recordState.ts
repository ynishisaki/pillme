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

		// 今日の記録はHome画面で操作するため、除外
		record.dailyRecord.slice(1).forEach((dailyRecord, index) => {
			const yearMonth = dailyRecord.date.slice(0, 7);
			const currentRecord = record.dailyRecord[index];

			if (!monthlyRecord[yearMonth]) {
				monthlyRecord[yearMonth] = [{ index: index, ...currentRecord }];
				return;
			}

			monthlyRecord[yearMonth].push({ index: index, ...currentRecord });
		});

		// 月のリスト
		// const yearMonthList = monthlyRecord.map((yearMonth) => yearMonth);

		return monthlyRecord;
	},
});
