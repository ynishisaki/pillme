import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { MarkedDates, MarkingTypes } from "react-native-calendars/src/types";

LocaleConfig.locales.jp = {
	monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

interface Props {
	handleDayPress: (date: DateData) => void;
	markingType?: MarkingTypes;
	markedDates: MarkedDates;
	minDate: string;
	maxDate: string;
}

export const CustomCalender = (props: Props) => {
	return (
		<Calendar
			onDayPress={props.handleDayPress}
			markingType={props.markingType}
			markedDates={props.markedDates}
			showSixWeeks
			minDate={props.minDate}
			maxDate={props.maxDate}
			theme={{
				stylesheet: {
					calendar: {
						header: {
							dayTextAtIndex0: {
								color: "red",
							},
							dayTextAtIndex6: {
								color: "blue",
							},
						},
					},
				},
				textDayFontFamily: "monospace",
				textMonthFontFamily: "monospace",
				textDayHeaderFontFamily: "monospace",
				textDayFontSize: 16,
				textMonthFontSize: 20,
			}}
			style={{
				paddingBottom: 24,
			}}
		/>
	);
};
