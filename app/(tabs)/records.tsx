import CheckBox from "@/components/common/CheckBox";
import { CustomCalender } from "@/components/common/CustomCalender";
import { ThemedText } from "@/components/common/ThemedText";
import ContentLayout from "@/components/common/content/ContentLayout";
import ScreenLayout from "@/components/common/screen/ScreenLayout";
import { Colors } from "@/constants/Colors";
import { locale, mdweek } from "@/constants/tempo-options";
import { hasNoRecordDays } from "@/functions/countRecord";
import { judgeIsTomorrowStartsRestPeriod } from "@/functions/judgeIsRestPeriod";
import { recordState } from "@/states/recordState";
import { format } from "@formkit/tempo";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { useRecoilState } from "recoil";

export default function RecordsScreen() {
  const isFocused = useIsFocused();

  const [record, setRecord] = useRecoilState(recordState);

  const { hasNoRecordWithoutToday } = hasNoRecordDays(record);

  const [selectedDailyRecordIndex, setSelectedDailyRecordIndex] = useState(0);
  const [isRecordNone, setIsRecordNone] = useState(false);

  // today record
  const selectedRecord = record.dailyRecord[selectedDailyRecordIndex];

  const selectedDate = record.dailyRecord[selectedDailyRecordIndex].date;
  const dateWeekStringsForDisplay = format(selectedDate, mdweek, locale);

  function handleDayPress(date: DateData) {
    const pressedDate = date.dateString;

    const index = record.dailyRecord.findIndex(
      (record) => record.date === pressedDate
    );

    if (index > -1) {
      setSelectedDailyRecordIndex(index);
      setIsRecordNone(false);
      return;
    }
    // 記録範囲外の日付を選択した場合の処理
    setIsRecordNone(true);
  }

  const tookMedicine = {
    key: "tookMedicine",
    color: Colors.pillColor,
    selectedDotColor: "blue",
  };
  const haveBleeding = {
    key: "haveBleeding",
    color: Colors.pillColor,
    selectedDotColor: "blue",
  };
  const isRestPeriod = {
    key: "isRestPeriod",
    color: "gray",
    selectedDotColor: "blue",
  };

  const markedDates: MarkedDates = record.dailyRecord.reduce(
    (acc, record, index) => {
      const dots = [];
      if (record.tookMedicine) {
        dots.push(tookMedicine);
      }
      if (record.haveBleeding) {
        dots.push(haveBleeding);
      }
      if (record.isRestPeriod) {
        dots.push(isRestPeriod);
      }
      const selectedRecord = {
        [record.date]: {
          selected: selectedDate === record.date ? true : false,
          selectedColor: Colors.lightBlue,
          dots: dots,
        },
      };
      return {
        ...acc,
        ...selectedRecord,
      };
    },
    {}
  );

  function handleUpdateRecord(
    key: string,
    nextBoolean: boolean,
    index: number
  ) {
    console.log("index", index);
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
      // console.log("updatedRecord", updatedRecord.dailyRecord.slice(0, 7));
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
              minDate={record.dailyRecord[record.dailyRecord.length - 1].date}
              maxDate={record.dailyRecord[0].date}
            />
          </ContentLayout>
          <ContentLayout title={`${dateWeekStringsForDisplay} の記録`}>
            <View style={styles.contentLayout}>
              {isRecordNone ? (
                <ThemedText type="warn">服薬記録がありません</ThemedText>
              ) : (
                <View style={styles.checkBoxLayout}>
                  <CheckBox
                    textComponent={
                      <View style={{ marginBottom: 6 }}>
                        <ThemedText>服薬</ThemedText>
                      </View>
                    }
                    type="medicine"
                    size={"lg"}
                    isChecked={selectedRecord.tookMedicine}
                    isRestPeriod={selectedRecord.isRestPeriod}
                    onPress={(nextBoolean) =>
                      handleUpdateRecord(
                        "tookMedicine",
                        nextBoolean,
                        selectedDailyRecordIndex
                      )
                    }
                  />
                  <CheckBox
                    textComponent={
                      <View style={{ marginBottom: 6 }}>
                        <ThemedText>出血</ThemedText>
                      </View>
                    }
                    type="bleeding"
                    size={"lg"}
                    isChecked={selectedRecord.haveBleeding}
                    isRestPeriod={selectedRecord.isRestPeriod}
                    onPress={(nextBoolean) =>
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
