import { useIsFocused } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import ContentLayout from "~/components/ContentLayout";
import { CurrentSheet } from "~/components/record/CurrentSheet";
import { WeeklyRecord } from "~/components/record/WeeklyRecord";
import ScreenLayout from "~/template/ScreenLayout";
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useRecoilValue } from "recoil";
import { HomeTodaysRecord } from "~/components/home/HomeTodaysRecord";
import { recordState } from "~/states/recordState";

LocaleConfig.locales.jp = {
	monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

// const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
// const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
// const workout = {key: 'workout', color: 'green'};

const tookMedicineDot = { key: "tookMedicine", color: "blue", selectedDotColor: "blue" };
const haveBleedingDot = { key: "haveBleeding", color: "red", selectedDotColor: "red" };
const isRestPeriodDot = { key: "restPeriod", color: "gray", selectedDotColor: "gray" };

export const Record = () => {
	const isFocused = useIsFocused();

	const record = useRecoilValue(recordState);

	const selectedDateDots = { "2024-06-01": { selected: true, marked: true, selectedColor: "blue" } };
	const markedDates = record.dailyRecord.reduce((acc, record, index) => {
		const { tookMedicine, haveBleeding, isRestPeriod } = record;

		const dots = [];
		if (tookMedicine) dots.push(tookMedicineDot);
		if (haveBleeding) dots.push(haveBleedingDot);
		if (isRestPeriod) dots.push(isRestPeriodDot);

		acc = {
			...acc,
			[record.date]: { dots: dots },
		};
		return acc;
	}, selectedDateDots);

	return (
		<ScreenLayout>
			{isFocused && (
				<View style={styles.viewLayout}>
					<ContentLayout title='現在のシート'>
						<Calendar
							onDayPress={(day) => {
								console.log("selected day", day);
							}}
							markingType={"multi-dot"}
							markedDates={markedDates}
							style={{
								height: "100%",
							}}
							theme={{
								"stylesheet.calendar.header": {
									dayTextAtIndex0: {
										color: "red",
									},
									dayTextAtIndex6: {
										color: "blue",
									},
								},
								"stylesheet.calendar.main": {
									monthView: {
										flex: 1,
										height: "100%",
										justifyContent: "space-around",
									},
									week: {
										flex: 1,
										marginVertical: 0,
										flexDirection: "row",
										justifyContent: "space-around",
									},
									dayContainer: {
										borderColor: "#f5f5f5",
										borderWidth: 1,
										flex: 1,
									},
								},
							}}
						/>
						{/* <DateTimePicker
							mode='multiple'
							locale='ja'
							// 120日前〜今日まで選択可能
							minDate={dayjs().subtract(120, "day")}
							maxDate={dayjs()}
							date={selectedDate}
							// onChange={(params) => setSelectedDate(params.date)}
						/> */}
					</ContentLayout>
					{/* <CurrentSheet />
					<WeeklyRecord /> */}
				</View>
			)}
		</ScreenLayout>
	);
};

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		justifyContent: "center",
		// justifyContent: "flex-end",
		// alignItems: "center",
		// rowGap: 50,
	},
});
