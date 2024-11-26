import { ThemedText } from "@/components/common/ThemedText";
import ContentLayout from "@/components/common/content/ContentLayout";
import ScreenLayout from "@/components/common/screen/ScreenLayout";
import useCalender from "@/components/records/useCalender";
import useSelectDayRecord from "@/components/records/useSelectDayRecord";
import Checkboxes from "@/components/ui/Checkboxes";
import { CustomCalender } from "@/components/ui/CustomCalender";
import { Colors } from "@/constants/Colors";
import { locale, mdweek } from "@/constants/tempo-options";
import { hasNoRecordDays } from "@/functions/countRecord";
import { judgeIsTomorrowStartsRestPeriod } from "@/functions/judgeIsRestPeriod";
import { recordState } from "@/states/recordState";
import { format } from "@formkit/tempo";
import { useIsFocused } from "@react-navigation/native";
import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

export default function RecordsScreen() {
  const isFocused = useIsFocused();

  // const record = useRecoilValue(recordState);
  const [record, setRecord] = useRecoilState(recordState);

  const { hasNoRecordWithoutToday } = hasNoRecordDays(record);

  // const { handleUpdateRecord } = useSelectDayRecord();

  const {
    handleDayPress,
    markedDates,
    minDate,
    maxDate,
    isRecordNone,
    selectedRecord,
    selectedDailyRecordIndex,
  } = useCalender();

  const selectedDate = record.dailyRecord[selectedDailyRecordIndex].date;
  const dateWeekStringsForDisplay = format(selectedDate, mdweek, locale);

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

  return (
    <ScreenLayout>
      {isFocused && (
        <View style={styles.viewLayout}>
          <ContentLayout title="服薬カレンダー">
            {hasNoRecordWithoutToday && (
              <View style={{ margin: 20 }}>
                <ThemedText style={{ color: Colors.pillColor }}>
                  記録忘れの日があります
                </ThemedText>
              </View>
            )}
            <CustomCalender
              handleDayPress={handleDayPress}
              markingType={"multi-dot"}
              markedDates={markedDates}
              minDate={minDate}
              maxDate={maxDate}
            />
          </ContentLayout>
          <ContentLayout title={`${dateWeekStringsForDisplay} の記録`}>
            <View style={styles.contentLayout}>
              {isRecordNone ? (
                <ThemedText type="warn">服薬記録がありません</ThemedText>
              ) : (
                <View style={styles.checkBoxLayout}>
                  <Checkboxes
                    dailyRecord={selectedRecord}
                    handleUpdateTookMedicineRecord={(nextBoolean) =>
                      handleUpdateRecord(
                        "tookMedicine",
                        nextBoolean,
                        selectedDailyRecordIndex
                      )
                    }
                    handleUpdateHaveBleedingRecord={(nextBoolean) =>
                      handleUpdateRecord(
                        "haveBleeding",
                        nextBoolean,
                        selectedDailyRecordIndex
                      )
                    }
                  />
                </View>
              )}
            </View>
          </ContentLayout>
        </View>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  viewLayout: {
    flex: 1,
    justifyContent: "flex-end",
    rowGap: 20,
  },
  contentLayout: {
    padding: 16,
  },
  checkBoxLayout: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    // height: 100,
  },
});
