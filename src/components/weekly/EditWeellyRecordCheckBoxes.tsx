import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { ChevronLeftIcon, ChevronRightIcon, RedCircleIcon } from "~/components/Icons";
import CheckBox from "~/components/common/CheckBox";
import CheckboxTitleText from "~/components/common/CheckboxTitleText";
import CustomIconButton from "~/components/common/CustomIconButton";
import Divider from "~/components/common/Divider";
import OverviewText from "~/components/common/OverviewText";
import { ThemedText } from "~/components/common/ThemedText";
import WidthFixedRightText from "~/components/common/WidthFixedRightText";
import { getDateWeekStringsForDisplay, getYearMonthStrings } from "~/functions/getDateStrings";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { monthlyRecordState, recordState } from "~/states/recordState";

export default function EditWeellyRecordCheckBoxes() {
	const [record, setRecord] = useRecoilState(recordState);
	const monthlyRecord = useRecoilValue(monthlyRecordState);
	const [yearMonthIndex, setYearMonthIndex] = useState<number>(0);

	const oldestYearMonthIndex = Object.keys(monthlyRecord).length - 1;
	const selectedYearMonth = Object.keys(monthlyRecord)[yearMonthIndex];

	const isPrevMonthDisabled = yearMonthIndex === oldestYearMonthIndex;
	const isNextMonthDisabled = yearMonthIndex === 0;

	const handlePrevMonth = () => {
		if (isPrevMonthDisabled) return;
		setYearMonthIndex(yearMonthIndex + 1);
	};
	const handleNextMonth = () => {
		if (isNextMonthDisabled) return;
		setYearMonthIndex(yearMonthIndex - 1);
	};

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
		<View style={styles.container}>
			{monthlyRecord[selectedYearMonth] && (
				<View style={styles.monthSelectContainer}>
					{!isPrevMonthDisabled && (
						<CustomIconButton onPress={handlePrevMonth}>
							<ChevronLeftIcon />
						</CustomIconButton>
					)}

					<ThemedText type='default'>{getYearMonthStrings(selectedYearMonth)}</ThemedText>
					{!isNextMonthDisabled && (
						<CustomIconButton onPress={handleNextMonth}>
							<ChevronRightIcon />
						</CustomIconButton>
					)}
				</View>
			)}

			<Divider />

			{/* 選択月に記録があれば表示 */}
			{monthlyRecord[selectedYearMonth] ? (
				<ScrollView style={styles.scrollView}>
					<View key={-1} style={styles.horizonalStackLayout}>
						<WidthFixedRightText>
							<></>
						</WidthFixedRightText>

						<CheckboxTitleText>服薬</CheckboxTitleText>
						<CheckboxTitleText>出血</CheckboxTitleText>
					</View>
					<View style={styles.verticalStackLayout}>
						{monthlyRecord[selectedYearMonth].map((dailyRecord, index) => {
							return (
								<View key={index} style={styles.horizonalStackLayout}>
									<WidthFixedRightText>
										{/* 記録をつけるべき箇所に赤丸を表示 */}
										{!dailyRecord.tookMedicine && !dailyRecord.isRestPeriod && (
											<RedCircleIcon
												style={{
													position: "absolute",
													left: 1,
												}}
											/>
										)}
										{getDateWeekStringsForDisplay(dailyRecord.date)}
										{"\n"}({dailyRecord.index}日前)
									</WidthFixedRightText>
									{record.isAsyncStorageLoaded && (
										<>
											<CheckBox
												type='medicine'
												size={"md"}
												isChecked={dailyRecord.tookMedicine}
												isRestPeriod={dailyRecord.isRestPeriod}
												onPress={(nextBoolean) =>
													handleUpdateRecord("tookMedicine", nextBoolean, dailyRecord.index)
												}
											/>
											<CheckBox
												type='bleeding'
												size={"md"}
												isChecked={dailyRecord.haveBleeding}
												isRestPeriod={dailyRecord.isRestPeriod}
												onPress={(nextBoolean) =>
													handleUpdateRecord("haveBleeding", nextBoolean, dailyRecord.index)
												}
											/>
										</>
									)}
								</View>
							);
						})}
					</View>
				</ScrollView>
			) : (
				<OverviewText type='warn' key={-1}>
					記録がありません
				</OverviewText>
			)}
			<Divider />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
	monthSelectContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		gap: 8,
	},
	verticalStackLayout: {
		gap: 12,
	},
	scrollView: {
		paddingHorizontal: 20,
	},
	horizonalStackLayout: {
		flexDirection: "row",
		justifyContent: "center",
		columnGap: 16,
		alignItems: "center",
	},
});
