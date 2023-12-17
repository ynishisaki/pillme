import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { recordState } from "~/states/recordState";
import CheckBox from "~/components/CheckBox";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";
import { hasNoRecordDays } from "~/functions/countRecord";
import { useEffect } from "react";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";

export default function EditWeellyRecordCheckBoxes() {
	const [record, setRecord] = useRecoilState(recordState);

	function updateAWeekRecord(key: string, nextBoolean: boolean, index: number) {
		let updatedRecord = {
			...record,
			dailyRecord: [
				...record.dailyRecord.slice(0, index),
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
		}
		setRecord(updatedRecord);
	}

	const recordLength = record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	const editableWeelyRecordCheckBoxes = [];
	// 今日の記録はHomeでつける
	for (let i = 1; i < recordLength; i++) {
		const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record, i);
		editableWeelyRecordCheckBoxes.push(
			<View key={i} style={styles.horizonalStackLayout}>
				<Text style={styles.text}>
					{getDateWeekStringsForDisplay(record.dailyRecord[i].date)} ({i}日前)
				</Text>

				{record.isAsyncStorageLoaded && (
					<>
						<CheckBox
							title={null}
							type='medicine'
							size={"md"}
							isChecked={record.dailyRecord[i].tookMedicine}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							isNotRecorded={hasNoRecordWithoutToday}
							onPress={(nextBoolean) => updateAWeekRecord("tookMedicine", nextBoolean, i)}
						/>
						<CheckBox
							title={null}
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

	// recordを更新、isAsyncStorageLoadedをtrueに戻すことでチェックボックスを再描画させる
	// useEffect(() => {
	// 	setRecord({ ...record, isAsyncStorageLoaded: true });
	// }, []);

	return (
		<View style={styles.verticalStackLayout}>
			<View style={styles.horizonalStackLayout}>
				<Text style={styles.text}></Text>
				<Text style={styles.checkboxTitleText}>服薬</Text>
				<Text style={styles.checkboxTitleText}>出血</Text>
			</View>
			{editableWeelyRecordCheckBoxes}
		</View>
	);
}

const styles = StyleSheet.create({
	verticalStackLayout: {
		flex: 1,
		marginVertical: 20,
		marginHorizontal: "auto",
		gap: 20,
	},
	horizonalStackLayout: {
		flexDirection: "row",
		// justifyContent: "space-around",
		justifyContent: "center",
		columnGap: 20,
		alignItems: "center",
	},
	checkboxTitleText: {
		width: 70,
		textAlign: "center",
	},
	text: {
		width: 100,
	},
});
