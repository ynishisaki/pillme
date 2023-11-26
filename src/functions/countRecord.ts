import { dailyRecordType, recordType } from "~/types/record";

// シートの飲んだ数と残りの錠数
export default function getCurrentSheetStatus(record: recordType) {
	const { numOfPillsPerSheet, beginSheetIndex } = record.initialSheetSettings;
	const totalTookMedicineLength = record.dailyRecord.filter((item) => item.tookMedicine === true).length;

	let tookDays = (totalTookMedicineLength + beginSheetIndex) % numOfPillsPerSheet;

	const isTodayTookMedicine = record.dailyRecord[0].tookMedicine;
	tookDays = tookDays === 0 && isTodayTookMedicine ? numOfPillsPerSheet : tookDays;
	const remainingDays = numOfPillsPerSheet - tookDays;

	return {
		tookDays,
		remainingDays,
	};
}

// 記録をつけていない日があるか調べる
export function hasNoRecordDays(record: recordType) {
	const startTakeMedicineIndex = countStartTakeMedicineIndex(record);
	const truncatedDailyRecordWithoutToday = [...record.dailyRecord].slice(1, startTakeMedicineIndex);

	function isAllKeyFalse(record: dailyRecordType) {
		return record.tookMedicine === false && record.haveBleeding === false && record.isRestPeriod === false;
	}

	const hasNoRecordWithoutToday = truncatedDailyRecordWithoutToday.some((record) => {
		return isAllKeyFalse(record);
	});

	const hasNoRecordToday = isAllKeyFalse(record.dailyRecord[0]);

	return {
		hasNoRecordWithoutToday,
		hasNoRecordToday,
	};
}

// 服薬開始インデックス
function countStartTakeMedicineIndex(record: recordType) {
	const latestIsRestPeriodIndex = record.dailyRecord.findIndex((item) => item.isRestPeriod === true);
	const recordLastIndex = record.dailyRecord.length - 1;

	// -1: 休薬日なし -> 記録初日が服薬開始日
	// 0: 今日が休薬日 -> もっと前の日になるはず（用途による）
	if (latestIsRestPeriodIndex === -1) return recordLastIndex;
	else if (latestIsRestPeriodIndex === 0) return recordLastIndex;

	// 服薬開始日は休薬日の翌日
	return latestIsRestPeriodIndex - 1;
}

// 服薬日数
export function countTakeMedicineDays(record: recordType) {
	const startTakeMedicineIndex = countStartTakeMedicineIndex(record);

	let takeMedicineDaysWithoutToday = 0;

	const truncatedDailyRecordWithoutToday = [...record.dailyRecord].slice(1, startTakeMedicineIndex).reverse();
	truncatedDailyRecordWithoutToday.some((record) => {
		if (record.tookMedicine === true) {
			takeMedicineDaysWithoutToday++;
			return false;
		} else {
			return true;
		}
	});
	// for (let i = startTakeMedicineIndex; i >= 0; i--) {
	// 	if (record.dailyRecord[i].tookMedicine === true) {
	// 		takeMedicineDaysWithoutToday++;
	// 	} else {
	// 		break;
	// 	}
	// }

	const todaysCount = record.dailyRecord[0].tookMedicine ? 1 : 0;
	const takeMedicineDays = takeMedicineDaysWithoutToday + todaysCount;

	return {
		takeMedicineDaysWithoutToday,
		takeMedicineDays,
	};
}

// 出血日数
export function countHaveBleedingDays(record: recordType) {
	let haveBleedingDaysWithoutToday = 0;
	for (let i = 1; i < record.dailyRecord.length; i++) {
		if (record.dailyRecord[i].haveBleeding === true) {
			haveBleedingDaysWithoutToday++;
		} else {
			break;
		}
	}

	const todaysCount = record.dailyRecord[0].haveBleeding ? 1 : 0;
	const haveBleedingDays = haveBleedingDaysWithoutToday + todaysCount;

	return {
		haveBleedingDaysWithoutToday,
		haveBleedingDays,
	};
}

// 休薬日数
export function countIsRestPeriodDays(record: recordType) {
	let restPeriodDaysWithoutToday = 0;
	for (let i = 1; i < record.dailyRecord.length; i++) {
		if (record.dailyRecord[i].isRestPeriod === true) {
			restPeriodDaysWithoutToday++;
		} else {
			break;
		}
	}

	const todaysCount = record.dailyRecord[0].isRestPeriod ? 1 : 0;
	const restPeriodDays = restPeriodDaysWithoutToday + todaysCount;

	return {
		restPeriodDaysWithoutToday,
		restPeriodDays,
	};
}
