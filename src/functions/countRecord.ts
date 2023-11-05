import { recordType } from "~/types/record";

// 最後のisRestPeriod=trueの翌日から数える
export function countStartTakeMedicineIndex(record: recordType) {
	const latestIsRestPeriodIndex = record.dailyRecord.findIndex((item) => item.isRestPeriod === true);
	const recordLength = record.dailyRecord.length;
	return latestIsRestPeriodIndex > 0 ? latestIsRestPeriodIndex : recordLength - 1;
}

export function countTakeMedicineDays(record: recordType) {
	const startTakeMedicineIndex = countStartTakeMedicineIndex(record);

	let count = 0;
	for (let i = startTakeMedicineIndex; i > -1; i--) {
		if (record.dailyRecord[i].tookMedicine === true) {
			count++;
		} else {
			break;
		}
	}
	return count;
}

// jsonから、昨日から直近で出血が何日連続しているか数える
export function countHaveBleedingDays(record: recordType) {
	let count = 0;
	for (let i = 1; i < record.dailyRecord.length; i++) {
		if (record.dailyRecord[i].haveBleeding === true) {
			count++;
		} else {
			break;
		}
	}
	// 今日の出血の有無を調べ、含める
	return record.dailyRecord[0].haveBleeding ? count + 1 : count;
}

export function countIsRestPeriodDays(record: recordType) {
	let count = 0;
	for (let i = 1; i < record.dailyRecord.length; i++) {
		if (record.dailyRecord[i].isRestPeriod === true) {
			count++;
		} else {
			break;
		}
	}

	return count;
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
