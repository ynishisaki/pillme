import { ThemedText } from "@/components/common/ThemedText";
import ContentLayout from "@/components/common/content/ContentLayout";
import SheetModal from "@/components/home/SheetModal";
import Checkboxes from "@/components/ui/Checkboxes";
import { Colors } from "@/constants/Colors";
import { hasNoRecordDays } from "@/functions/countRecord";
import { judgeIsTomorrowStartsRestPeriod } from "@/functions/judgeIsRestPeriod";
import { recordState } from "@/states/recordState";
import { recordType } from "@/types/record";
import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

export default function HomeTodaysRecord() {
  const [record, setRecord] = useRecoilState(recordState);

  const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

  function updateTodayRecord(key: string, nextBoolean: boolean) {
    const updatedRecord: recordType = {
      ...record,
      dailyRecord: [
        {
          ...record.dailyRecord[0],
          [key]: nextBoolean,
        },
        ...record.dailyRecord.slice(1),
      ],
    };

    const isTomorrowStartsRestPeriod =
      judgeIsTomorrowStartsRestPeriod(updatedRecord);
    setRecord(updatedRecord);

    // 明日から休薬日の場合はアラートを表示
    nextBoolean && isTomorrowStartsRestPeriod && alertTomorrowRestPeriod();
  }

  const alertTomorrowRestPeriod = () =>
    Alert.alert(
      "明日から休薬日です",
      `出血の有無に関わらず${record.initialSheetSettings.stopTakingDays}日間休薬します。`,
      [
        {
          text: "OK",
          style: "default",
        },
      ]
    );

  return (
    <ContentLayout title="今日の記録">
      <View style={styles.contentLayout}>
        {!hasNoRecordWithoutToday && hasNoRecordToday && (
          <ThemedText
            style={{
              color: Colors.pillColor,
            }}
          >
            今日の記録をつけてください
          </ThemedText>
        )}
        <View style={styles.checkBoxLayout}>
          {record.isAsyncStorageLoaded && (
            <Checkboxes
              dailyRecord={record.dailyRecord[0]}
              handleUpdateTookMedicineRecord={(nextBoolean) =>
                updateTodayRecord("tookMedicine", nextBoolean)
              }
              handleUpdateHaveBleedingRecord={(nextBoolean) =>
                updateTodayRecord("haveBleeding", nextBoolean)
              }
              isNotRecorded={hasNoRecordWithoutToday}
            />
          )}
        </View>

        <SheetModal />
      </View>
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  contentLayout: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
  },
  checkBoxLayout: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
