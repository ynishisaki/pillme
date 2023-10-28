import { recordType } from "~/types";
import {
	countHaveBleedingDays,
	countIsRestPeriodDays,
	countNotRecordDays,
	countTakeMedicineDays,
} from "~/functions/countRecord";

export const judgeIsTodayRestPeriod = (record: recordType): boolean => {
	const takeMedicineDays = countTakeMedicineDays(record);
	const haveBleedingDays = countHaveBleedingDays(record);
	const isRestPeriodDays = countIsRestPeriodDays(record);
	const notRecordDays = countNotRecordDays(record);

	console.log("takeMedicineDays", takeMedicineDays);
	console.log("haveBleedingDays", haveBleedingDays);
	console.log("isRestPeriodDays", isRestPeriodDays);
	console.log("notRecordDays", notRecordDays);

	// 今日の記録があるので、それをそのまま返す
	if (notRecordDays === 0) {
		const todayIsRestPeriod = record.dailyRecord[0].isRestPeriod;
		return todayIsRestPeriod;
	}

	// 昨日までで、服薬120日以上の場合 -> 今日から休薬期間
	// 昨日までで、服薬24日以上かつ出血3日以上の場合 -> 今日から休薬期間
	// 昨日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
	const shouldRest =
		takeMedicineDays >= 120 ||
		(takeMedicineDays >= 24 && haveBleedingDays >= 3) ||
		(isRestPeriodDays > 0 && isRestPeriodDays < 4);

	// 今日の記録がないので、昨日までの記録から判定する
	if (notRecordDays === 1 && shouldRest) {
		return true;
	}

	// 昨日以前の記録がない場合もfalseとする
	return false;
};
