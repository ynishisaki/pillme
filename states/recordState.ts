import { locale, yyyymmdd } from "@/constants/tempo-options";
import { dailyRecordType, recordType } from "@/types/record";
import { addDay, format } from "@formkit/tempo";
import { atom, selector } from "recoil";

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
			date: format(new Date(), yyyymmdd, locale),
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

export const generatePastRecord = (numOfDays: number): recordType => {
	if (numOfDays < 1) return initialRecord;

	const record = initialRecord;
	let dailyRecord = [] as dailyRecordType[];

	for (let i = 0; i < numOfDays; i++) {
		const pastDate = addDay(new Date(), -i);
		dailyRecord.push({
			date: format(pastDate, yyyymmdd, locale),
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
