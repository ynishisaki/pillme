import { Colors } from "@/constants/Colors";
import { locale, yyyymmdd } from "@/constants/tempo-options";
import { addDay, format } from "@formkit/tempo";
import { useState } from "react";
import { DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

interface Props {
  todayDate: Date;
  parentDate: string;
}

export default function useCalender({ todayDate, parentDate }: Props) {
  // 120日前まで（今日の服薬も含めるため+1）
  const minDate = format(addDay(todayDate, -120 + 1), yyyymmdd, locale);
  const maxDate = format(todayDate, yyyymmdd, locale);

  const [selectedDate, setSelectedDate] = useState<string>(parentDate);

  function handleDayPress(date: DateData) {
    setSelectedDate(date.dateString);
  }

  const markedDates: MarkedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: Colors.lightBlue,
    },
  };

  return {
    handleDayPress,
    markedDates,
    minDate,
    maxDate,
    selectedDate,
    setSelectedDate,
  };
}
