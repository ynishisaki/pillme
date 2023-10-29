import { atom } from "recoil";
import { getDateStrings } from "~/functions/getDateStrings";

export const today = getDateStrings(new Date()); // YYYY-DD-MM

export const recordState = atom({
	key: "recordState",
	default: {
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
	},
});
