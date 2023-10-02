import { recordType } from "~/types";
import {
	countHaveBleedingDays,
	countIsRestPeriodDays,
	countNotRecordDays,
	countTakeMedicineDays,
} from "~/utils/countRecord";

export const getIsRestPeriod = (record: recordType): boolean => {
	const takeMedicineDays = countTakeMedicineDays(record);
	const haveBleedingDays = countHaveBleedingDays(record);
	const isRestPeriodDays = countIsRestPeriodDays(record);
	const notRecordDays = countNotRecordDays(record);

	console.log("takeMedicineDays", takeMedicineDays);
	console.log("haveBleedingDays", haveBleedingDays);
	console.log("isRestPeriodDays", isRestPeriodDays);
	console.log("notRecordDays", notRecordDays);

	const isRestPeriod = takeMedicineDays >= 24 && haveBleedingDays >= 3;

	// 記録がないので、判断しない
	if (notRecordDays > 1) {
		return false;
	}
	// 今日の記録がない
	else if (notRecordDays === 1) {
		if (takeMedicineDays > 120) {
			return true;
		} else if (haveBleedingDays > 3) {
			return true;
		} else if (isRestPeriodDays < 3) {
			return true;
		} else {
			return false;
		}
	}
	// 今日の記録がある
	else {
		return isRestPeriod;
	}
};
