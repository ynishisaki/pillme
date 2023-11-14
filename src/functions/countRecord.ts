import { recordType } from "~/types/record";

// 現在のシートの飲んだ数と残りの錠数を返す
export default function getCurrentSheetStatus(record: recordType) {
	const { numOfPillsPerSheet, beginSheetIndex } = record.initialSheetSettings;
	const totalTookMedicineLength = record.dailyRecord.filter((item) => item.tookMedicine === true).length;

	let tookDays = (totalTookMedicineLength + beginSheetIndex) % numOfPillsPerSheet;

	const isTodayTookMedicine = record.dailyRecord[0].tookMedicine;
	tookDays = tookDays === 0 && isTodayTookMedicine ? numOfPillsPerSheet : tookDays;
	const remainingDays = numOfPillsPerSheet - tookDays;
	// console.log("tookDays", tookDays);
	// console.log("remainingDays", remainingDays);

	return {
		tookDays,
		remainingDays,
	};
}

// 最後のisRestPeriod=trueの翌日から数える
export function countStartTakeMedicineIndex(record: recordType) {
	const latestIsRestPeriodIndex = record.dailyRecord.findIndex((item) => item.isRestPeriod === true);
	const recordLength = record.dailyRecord.length;
	return latestIsRestPeriodIndex > 0 ? latestIsRestPeriodIndex : recordLength - 1;
}

// 服薬日数
export function countTakeMedicineDays(record: recordType) {
	const startTakeMedicineIndex = countStartTakeMedicineIndex(record);

	let takeMedicineDaysWithoutToday = 0;
	for (let i = startTakeMedicineIndex; i > 0; i--) {
		if (record.dailyRecord[i].tookMedicine === true) {
			takeMedicineDaysWithoutToday++;
		} else {
			break;
		}
	}

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

// 今日から何日前まで記録をつけていないか
export function countNotRecordDays(record: recordType) {
	let count = 0;
	for (let i = 0; i < record.dailyRecord.length; i++) {
		if (
			record.dailyRecord[i].tookMedicine === false &&
			record.dailyRecord[i].haveBleeding === false &&
			record.dailyRecord[i].isRestPeriod === false
		) {
			count++;
		} else {
			break;
		}
	}

	return count;
}
