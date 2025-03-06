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
  // 今日の記録がないので、実質昨日までの記録から判定していることに注意
  const { takeMedicineDays } = countTakeMedicineDays(record);
  const { haveBleedingDays } = countHaveBleedingDays(record);
  const { restPeriodDays } = countIsRestPeriodDays(record);
  const { hasNoRecordToday } = hasNoRecordDays(record);

  // 記録忘れがある場合は判定しない（できない）
  if (hasNoRecordToday) return false;

  // 昨日までで、服薬120日以上の場合 -> 今日から休薬期間
  const isOverMaxConteniousTakingDays =
    maxConteniousTakingDays <= takeMedicineDays;

  // 昨日までで、服薬25+3日以上かつ出血3日以上の場合 -> 今日から休薬期間
  const isOverMinConteniousBleedingDays =
    minConteniousTakingDays + conteniousBleeingDaysForRest <=
    takeMedicineDays &&
    conteniousBleeingDaysForRest <= haveBleedingDays;
    console.log("minConteniousTakingDays", minConteniousTakingDays);
    console.log("conteniousBleeingDaysForRest", conteniousBleeingDaysForRest);
    console.log("takeMedicineDays", takeMedicineDays);
    console.log("haveBleedingDays", haveBleedingDays);

  // 昨日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
  const isShouldContinueResting =
    0 < restPeriodDays &&
    restPeriodDays < stopTakingDays;

  console.log(
    "isOverMinConteniousBleedingDays",
    isOverMinConteniousBleedingDays
  );

  const shouldRest =
    isOverMaxConteniousTakingDays ||
    isOverMinConteniousBleedingDays ||
    isShouldContinueResting;

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
  if (!tookMedicine) return false;

  // 今日までで、服薬120日以上の場合 -> 明日から休薬期間
  const isOverMaxConteniousTakingDays =
    maxConteniousTakingDays <= takeMedicineDays;

  // 今日までで、服薬24日以上かつ出血3日以上の場合 -> 明日から休薬期間
  const isOverMinConteniousBleedingDays =
    minConteniousTakingDays + conteniousBleeingDaysForRest <=
      takeMedicineDays &&
    conteniousBleeingDaysForRest <= haveBleedingDays &&
    haveBleeding;

  // 今日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
  const shouldRest =
    isOverMaxConteniousTakingDays || isOverMinConteniousBleedingDays;

  return shouldRest;
};
