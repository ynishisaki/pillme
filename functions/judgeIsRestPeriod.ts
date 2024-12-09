import {
  countHaveBleedingDays,
  countIsRestPeriodDays,
  countTakeMedicineDays,
  hasNoRecordDays,
} from "@/functions/countRecord";
import { recordType } from "@/types/record";

export const judgeIsTodayRestPeriod = (record: recordType): boolean => {
  const {
    conteniousBleeingDaysForRest,
    maxConteniousTakingDays,
    minConteniousTakingDays,
    stopTakingDays,
  } = record.initialSheetSettings;

  const { takeMedicineDaysWithoutToday } = countTakeMedicineDays(record);
  const { haveBleedingDaysWithoutToday } = countHaveBleedingDays(record);
  const { restPeriodDaysWithoutToday } = countIsRestPeriodDays(record);
  const { hasNoRecordWithoutToday } = hasNoRecordDays(record);

  // 記録忘れがある場合は判定しない（できない）
  if (hasNoRecordWithoutToday) return false;

  // 今日の記録がないので、昨日までの記録から判定する
  // 昨日までで、服薬120日以上の場合 -> 今日から休薬期間
  // 昨日までで、服薬24日以上かつ出血3日以上の場合 -> 今日から休薬期間
  // 昨日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
  const shouldRest =
    maxConteniousTakingDays <= takeMedicineDaysWithoutToday ||
    (minConteniousTakingDays + conteniousBleeingDaysForRest <=
      takeMedicineDaysWithoutToday &&
      conteniousBleeingDaysForRest <= haveBleedingDaysWithoutToday) ||
    (0 < restPeriodDaysWithoutToday &&
      restPeriodDaysWithoutToday < stopTakingDays);

  return shouldRest;
};

export const judgeIsTomorrowStartsRestPeriod = (
  record: recordType,
  offset = 0
): boolean => {
  const {
    conteniousBleeingDaysForRest,
    maxConteniousTakingDays,
    minConteniousTakingDays,
  } = record.initialSheetSettings;

  const { tookMedicine, haveBleeding } = record.dailyRecord[offset];
  const { takeMedicineDays } = countTakeMedicineDays(record, offset);
  const { haveBleedingDays } = countHaveBleedingDays(record, offset);
  const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(
    record,
    offset
  );

  // 記録忘れがある場合は判定しない（できない）
  if (hasNoRecordWithoutToday || hasNoRecordToday) return false;

  // 今日の記録がある場合のみ判定を行う
  // 今日までで、服薬120日以上の場合 -> 明日から休薬期間
  // 今日までで、服薬24日以上かつ出血3日以上の場合 -> 明日から休薬期間
  // 今日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
  const shouldRest =
    (takeMedicineDays >= maxConteniousTakingDays && tookMedicine) ||
    (takeMedicineDays >=
      minConteniousTakingDays + conteniousBleeingDaysForRest &&
      tookMedicine &&
      haveBleedingDays >= conteniousBleeingDaysForRest &&
      haveBleeding);

  return shouldRest;
};
