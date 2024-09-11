import { countTotalTakeMedicineDays } from "@/functions/countRecord";
import { recordType } from "@/types/record";

// 今日服薬するピルの位置インデックスを計算
export function getTodaySheetIndex(record: recordType) {
	const { numOfPillsPerSheet, beginSheetIndex } = record.initialSheetSettings;
	const takeMedicineDays = countTotalTakeMedicineDays(record);

	return (takeMedicineDays - 1 + beginSheetIndex) % numOfPillsPerSheet;
}

// 記録初日のピルの位置インデックスを計算
export function getBeginSheetIndex(record: recordType, todaySheetIndex: number) {
	const { numOfPillsPerSheet } = record.initialSheetSettings;

	const takeMedicineDays = countTotalTakeMedicineDays(record);

	const tempBeginSheetIndex = (todaySheetIndex - (takeMedicineDays - 1)) % numOfPillsPerSheet;

	return tempBeginSheetIndex < 0 ? tempBeginSheetIndex + numOfPillsPerSheet : tempBeginSheetIndex;
}
