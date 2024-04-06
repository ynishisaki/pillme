import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { LeftIcon, RightIcon } from "~/components/Icons";
import BaseBlackText from "~/components/common/BaseBlackText";
import CheckBox from "~/components/common/CheckBox";
import OverviewAlertText from "~/components/common/OverviewAlertText";
import WidthFixedCheckboxTitleText from "~/components/common/WidthFixedCheckboxTitleText";
import WidthFixedRightText from "~/components/common/WidthFixedRightText";
import { hasNoRecordDays } from "~/functions/countRecord";
import { getDateWeekStringsForDisplay, getYearMonthStrings } from "~/functions/getDateStrings";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { monthlyRecordState, recordState } from "~/states/recordState";

export default function EditWeellyRecordCheckBoxes() {
	const [record, setRecord] = useRecoilState(recordState);
	const monthlyRecord = useRecoilValue(monthlyRecordState);
	const [yearMonth, setYearMonth] = useState<string>(record.dailyRecord[0].date.slice(0, 7)); // "2023-01"
	// console.log("record", record);
	// console.log("monthlyRecord", monthlyRecord);
	// console.log("yearMonth", yearMonth);

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
			<View style={styles.monthSelectContainer}>
				<LeftIcon />
				<BaseBlackText>{getYearMonthStrings(yearMonth)}</BaseBlackText>
				<RightIcon />
			</View>
			{/* 昨日以前の記録がない場合 */}
			{monthlyRecord[yearMonth] ? (
				<>
					<View key={-1} style={styles.horizonalStackLayout}>
						<WidthFixedRightText>
							<></>
						</WidthFixedRightText>

						<WidthFixedCheckboxTitleText>服薬</WidthFixedCheckboxTitleText>
						<WidthFixedCheckboxTitleText>出血</WidthFixedCheckboxTitleText>
					</View>
					<View style={styles.verticalStackLayout}>
						{monthlyRecord[yearMonth].map((dailyRecord, index) => {
							return (
								<View key={index} style={styles.horizonalStackLayout}>
									<WidthFixedRightText>
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
				</>
			) : (
				<OverviewAlertText key={-1}>編集できる記録がありません</OverviewAlertText>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20,
		marginHorizontal: "auto",
	},
	monthSelectContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	verticalStackLayout: {
		gap: 12,
	},
	horizonalStackLayout: {
		flexDirection: "row",
		justifyContent: "center",
		columnGap: 20,
		alignItems: "center",
	},
});
