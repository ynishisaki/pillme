import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { useRecoilState } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import CheckBox from "~/components/common/CheckBox";
import CheckboxTitleText from "~/components/common/CheckboxTitleText";
import OverviewText from "~/components/common/OverviewText";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";
import { pillColor } from "~/styles/color";
import ScreenLayout from "~/template/ScreenLayout";

LocaleConfig.locales.jp = {
	monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

export const Record = () => {
	const isFocused = useIsFocused();

	const [record, setRecord] = useRecoilState(recordState);

	const [selectedDailyRecordIndex, setSelectedDailyRecordIndex] = useState(0);
	const [isRecordNone, setIsRecordNone] = useState(false);

	// today record
	const selectedRecord = record.dailyRecord[selectedDailyRecordIndex];

	const selectedDate = record.dailyRecord[selectedDailyRecordIndex].date;
	const dateWeekStringsForDisplay = getDateWeekStringsForDisplay(selectedDate);

	function handleDayPress(date: DateData) {
		const pressedDate = date.dateString;

		const index = record.dailyRecord.findIndex((record) => record.date === pressedDate);

		if (index > -1) {
			setSelectedDailyRecordIndex(index);
			setIsRecordNone(false);
			return;
		}
		// 記録範囲外の日付を選択した場合の処理
		setIsRecordNone(true);
	}

	const markedDates: MarkedDates = record.dailyRecord.reduce((acc, record, index) => {
		const selectedRecord = {
			[record.date]: {
				selected: selectedDate === record.date ? true : false,
				marked: record.tookMedicine || record.isRestPeriod,
				selectedColor: "blue",
				dotColor: record.tookMedicine ? pillColor : "gray",
			},
		};
		return {
			...acc,
			...selectedRecord,
		};
	}, {});

	function handleUpdateRecord(key: string, nextBoolean: boolean, index: number) {
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

		const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(updatedRecord, index);

		if (isTomorrowStartsRestPeriod) {
			const { stopTakingDays } = record.initialSheetSettings;
			const updateRecordToIndex = index > stopTakingDays ? index - stopTakingDays : 0;

			updatedRecord = {
				...updatedRecord,
				dailyRecord: [
					...updatedRecord.dailyRecord.slice(0, updateRecordToIndex),
					// 休薬期間
					...Array.from({ length: index - updateRecordToIndex }, (_, i) => {
						return {
							...updatedRecord.dailyRecord[i],
							isRestPeriod: isTomorrowStartsRestPeriod,
						};
					}),
					// 記録した日はすでにupdatedRecordに含まれている
					...updatedRecord.dailyRecord.slice(index),
				],
			};

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
					<ContentLayout title='カレンダー'>
						<Calendar
							// TODO: Pressできる日付を限定する
							onDayPress={handleDayPress}
							markedDates={markedDates}
							showSixWeeks
							theme={{
								"stylesheet.calendar.header": {
									dayTextAtIndex0: {
										color: "red",
									},
									dayTextAtIndex6: {
										color: "blue",
									},
								},
							}}
						/>
					</ContentLayout>
					<ContentLayout title={`${dateWeekStringsForDisplay} の記録`}>
						<View style={styles.contentLayout}>
							{isRecordNone ? (
								<OverviewText type='warn'>服薬記録がありません</OverviewText>
							) : (
								<View style={styles.checkBoxLayout}>
									<CheckBox
										textComponent={<CheckboxTitleText>服薬</CheckboxTitleText>}
										type='medicine'
										size={"md"}
										isChecked={selectedRecord.tookMedicine}
										isRestPeriod={selectedRecord.isRestPeriod}
										onPress={(nextBoolean) =>
											handleUpdateRecord("tookMedicine", nextBoolean, selectedDailyRecordIndex)
										}
									/>
									<CheckBox
										textComponent={<CheckboxTitleText>出血</CheckboxTitleText>}
										type='bleeding'
										size={"md"}
										isChecked={selectedRecord.haveBleeding}
										isRestPeriod={selectedRecord.isRestPeriod}
										onPress={(nextBoolean) =>
											handleUpdateRecord("haveBleeding", nextBoolean, selectedDailyRecordIndex)
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
};

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		// justifyContent: "center",
		justifyContent: "flex-end",
		// alignItems: "center",
		rowGap: 10,
	},
	contentLayout: {
		// paddingHorizontal: 10,
		paddingVertical: 10,
		gap: 10,
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		// height: 100,
	},
});
