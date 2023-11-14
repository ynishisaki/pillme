import { recordType } from "~/types/record";
import {
	countHaveBleedingDays,
	countIsRestPeriodDays,
	countNotRecordDays,
	countTakeMedicineDays,
} from "~/functions/countRecord";

export const judgeIsTodayRestPeriod = (record: recordType): boolean => {
	const {
		beginSheetIndex,
		conteniousBleeingDaysForRest,
		maxConteniousTakingDays,
		minConteniousTakingDays,
		numOfPillsPerSheet,
		stopTakingDays,
	} = record.initialSheetSettings;

	const { takeMedicineDaysWithoutToday } = countTakeMedicineDays(record);
	const { haveBleedingDaysWithoutToday } = countHaveBleedingDays(record);
	const { restPeriodDaysWithoutToday } = countIsRestPeriodDays(record);
	const notRecordDays = countNotRecordDays(record);

	// 今日の記録があるので、それをそのまま返す
	if (notRecordDays === 0) {
		const todayIsRestPeriod = record.dailyRecord[0].isRestPeriod;
		return todayIsRestPeriod;
	}

	// 昨日までで、服薬120日以上の場合 -> 今日から休薬期間
	// 昨日までで、服薬24日以上かつ出血3日以上の場合 -> 今日から休薬期間
	// 昨日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
	const shouldRest =
		takeMedicineDaysWithoutToday >= maxConteniousTakingDays ||
		(takeMedicineDaysWithoutToday >= minConteniousTakingDays &&
			haveBleedingDaysWithoutToday >= conteniousBleeingDaysForRest) ||
		(restPeriodDaysWithoutToday > 0 && restPeriodDaysWithoutToday < stopTakingDays);

	// 今日の記録がないので、昨日までの記録から判定する
	if (notRecordDays === 1 && shouldRest) {
		return true;
	}

	// 昨日以前の記録がない場合もfalseとする
	return false;
};

export const judgeIsTomorrowStartsRestPeriod = (record: recordType): boolean => {
	const {
		beginSheetIndex,
		conteniousBleeingDaysForRest,
		maxConteniousTakingDays,
		minConteniousTakingDays,
		numOfPillsPerSheet,
		stopTakingDays,
	} = record.initialSheetSettings;

	const { tookMedicine, haveBleeding, isRestPeriod } = record.dailyRecord[0];
	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);
	const { restPeriodDays } = countIsRestPeriodDays(record);
	const notRecordDays = countNotRecordDays(record);

	// 今日の記録がある場合のみ判定を行う
	if (notRecordDays === 0) {
		// 今日までで、服薬120日以上の場合 -> 明日から休薬期間
		// 今日までで、服薬24日以上かつ出血3日以上の場合 -> 明日から休薬期間
		// 今日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
		const shouldRest =
			(takeMedicineDays >= maxConteniousTakingDays && tookMedicine) ||
			(takeMedicineDays >= minConteniousTakingDays &&
				tookMedicine &&
				haveBleedingDays >= conteniousBleeingDaysForRest &&
				haveBleeding) ||
			(restPeriodDays > 0 && restPeriodDays < stopTakingDays);

		return shouldRest;
	}
	return false;
};
