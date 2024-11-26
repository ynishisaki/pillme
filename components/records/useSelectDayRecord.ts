import { judgeIsTomorrowStartsRestPeriod } from "@/functions/judgeIsRestPeriod";
import { recordState } from "@/states/recordState";
import { Alert } from "react-native";
import { useRecoilState } from "recoil";

export default function useSelectDayRecord() {
  const [record, setRecord] = useRecoilState(recordState);

  function handleUpdateRecord(
    key: string,
    nextBoolean: boolean,
    index: number
  ) {
    let updatedRecord = {
      ...record,
      dailyRecord: [
        // 記録更新対象の日以降の記録は削除
        ...record.dailyRecord.slice(0, index).map((dailyRecord) => {
          return {
            ...dailyRecord,
            tookMedicine: false,
            haveBleeding: false,
            isRestPeriod: false,
          };
        }),
        // 記録更新対象
        {
          ...record.dailyRecord[index],
          [key]: nextBoolean,
        },
        ...record.dailyRecord.slice(index + 1),
      ],
    };

    const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(
      updatedRecord,
      index
    );

    if (isTomorrowStartsRestPeriod) {
      const { stopTakingDays } = record.initialSheetSettings;
      const updateRecordToIndex =
        index > stopTakingDays ? index - stopTakingDays : 0;

      updatedRecord = {
        ...updatedRecord,
        dailyRecord: [
          // 休薬期間以降
          ...updatedRecord.dailyRecord.slice(0, updateRecordToIndex),
          // 休薬期間（更新）
          ...updatedRecord.dailyRecord
            .slice(updateRecordToIndex, index)
            .map((dailyRecord) => {
              return {
                ...dailyRecord,
                isRestPeriod: isTomorrowStartsRestPeriod,
              };
            }),
          // 休薬期間以前
          ...updatedRecord.dailyRecord.slice(index),
        ],
      };
      updatedRecord.dailyRecord.slice(0, 7).forEach((dailyRecord) => {
        console.log(dailyRecord);
      });

      alertTomorrowRestPeriod();
    }
    setRecord(updatedRecord);
  }

  const alertTomorrowRestPeriod = () =>
    Alert.alert(
      "休薬日となりました",
      `出血の有無に関わらず${record.initialSheetSettings.stopTakingDays}日間休薬します。`,
      [
        {
          text: "OK",
          style: "default",
        },
      ]
    );

  return {
    handleUpdateRecord,
  };
}
