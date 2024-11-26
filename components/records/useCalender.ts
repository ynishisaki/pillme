import { Colors } from "@/constants/Colors";
import { recordState } from "@/states/recordState";
import { useState } from "react";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { useRecoilValue } from "recoil";

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

export default function useCalender() {
  const record = useRecoilValue(recordState);

  const minDate = record.dailyRecord[record.dailyRecord.length - 1].date;
  const maxDate = record.dailyRecord[0].date;

  const markedDates: MarkedDates = record.dailyRecord.reduce((acc, record) => {
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
  }, {});

  const [selectedDailyRecordIndex, setSelectedDailyRecordIndex] = useState(0);
  const [isRecordNone, setIsRecordNone] = useState(false);

  // today record
  const selectedRecord = record.dailyRecord[selectedDailyRecordIndex];
  const selectedDate = record.dailyRecord[selectedDailyRecordIndex].date;
  // const dateWeekStringsForDisplay = format(selectedDate, mdweek, locale);

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

  return {
    handleDayPress,
    markedDates,
    minDate,
    maxDate,
    isRecordNone,
    selectedRecord,
    selectedDailyRecordIndex,
  };
}
