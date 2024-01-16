import { Alert, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import CheckBox from "~/components/common/CheckBox";
import OverviewAlertText from "~/components/common/OverviewAlertText";
import { hasNoRecordDays } from "~/functions/countRecord";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";

export default function EditWeellyRecordCheckBoxes() {
	const [record, setRecord] = useRecoilState(recordState);

	function updateAWeekRecord(key: string, nextBoolean: boolean, index: number) {
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

	const recordLength = record.dailyRecord.length >= 8 ? 8 : record.dailyRecord.length;

	const editableWeelyRecordCheckBoxes = [];
	if (recordLength < 2) {
		// 昨日以前の記録がない場合
		editableWeelyRecordCheckBoxes.push(<OverviewAlertText key={-1}>編集できる記録がありません</OverviewAlertText>);
	} else {
		editableWeelyRecordCheckBoxes.push(
			<View key={-1} style={styles.horizonalStackLayout}>
				<Text style={styles.text}></Text>

				<Text style={styles.checkboxTitleText}>服薬</Text>
				<Text style={styles.checkboxTitleText}>出血</Text>
			</View>
		);
	}

	// 今日の記録はHomeでつける
	for (let i = 1; i < recordLength; i++) {
		const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record, i);
		editableWeelyRecordCheckBoxes.push(
			<View key={i} style={styles.horizonalStackLayout}>
				<Text style={styles.text}>
					{getDateWeekStringsForDisplay(record.dailyRecord[i].date)}
					{"\n"}({i}日前)
				</Text>
				{record.isAsyncStorageLoaded && (
					<>
						<CheckBox
							type='medicine'
							size={"md"}
							isChecked={record.dailyRecord[i].tookMedicine}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							isNotRecorded={hasNoRecordWithoutToday}
							onPress={(nextBoolean) => updateAWeekRecord("tookMedicine", nextBoolean, i)}
						/>
						<CheckBox
							type='bleeding'
							size={"md"}
							isChecked={record.dailyRecord[i].haveBleeding}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							isNotRecorded={hasNoRecordWithoutToday}
							onPress={(nextBoolean) => updateAWeekRecord("haveBleeding", nextBoolean, i)}
						/>
					</>
				)}
			</View>
		);
	}

	return <View style={styles.verticalStackLayout}>{editableWeelyRecordCheckBoxes}</View>;
}

const styles = StyleSheet.create({
	verticalStackLayout: {
		flex: 1,
		marginVertical: 20,
		marginHorizontal: "auto",
		gap: 12,
	},
	horizonalStackLayout: {
		flexDirection: "row",
		justifyContent: "center",
		columnGap: 20,
		alignItems: "center",
	},
	checkboxTitleText: {
		width: 70,
		textAlign: "center",
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
	},
	text: {
		width: 90,
		textAlign: "right",
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
	},
});
