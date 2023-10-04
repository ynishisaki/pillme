import { recordType } from "~/types";
import {
	countHaveBleedingDays,
	countIsRestPeriodDays,
	countNotRecordDays,
	countTakeMedicineDays,
} from "~/utils/countRecord";

export const judgeIsTodayRestPeriod = (record: recordType): boolean => {
	const takeMedicineDays = countTakeMedicineDays(record);
	const haveBleedingDays = countHaveBleedingDays(record);
	const isRestPeriodDays = countIsRestPeriodDays(record);
	const notRecordDays = countNotRecordDays(record);

	console.log("takeMedicineDays", takeMedicineDays);
	console.log("haveBleedingDays", haveBleedingDays);
	console.log("isRestPeriodDays", isRestPeriodDays);
	console.log("notRecordDays", notRecordDays);

	// 記録がないので、判断しない
	if (notRecordDays > 1) {
		return false;
	}
	// 今日の記録がない
	else if (notRecordDays === 1) {
		//
		// 昨日までで、服薬120日以上の場合 -> 今日から休薬期間
		// 昨日までで、服薬24日以上かつ出血3日以上の場合 -> 今日から休薬期間
		// 昨日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
		if (
			takeMedicineDays >= 120 ||
			(takeMedicineDays >= 24 && haveBleedingDays >= 3) ||
			(isRestPeriodDays > 0 && isRestPeriodDays < 4)
		) {
			return true;
		} else {
			return false;
		}
	}
	// 今日の記録がある
	else {
		const todayTookMedicine = record.dailyRecord[0].tookMedicine;
		const todayHaveBleeding = record.dailyRecord[0].haveBleeding;
		const todayIsRestPeriod = record.dailyRecord[0].isRestPeriod;
		if (todayIsRestPeriod) {
			return true;
		} else {
			return false;
		}
	}
};
