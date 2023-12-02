import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { recordState } from "~/states/recordState";
import CheckBox from "~/components/CheckBox";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";

export default function EditWeellyRecordCheckBoxes() {
	const [record, setRecord] = useRecoilState(recordState);

	function updateAWeekRecord(key: string, nextBoolean: boolean, index: number) {
		const updatedRecord = {
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

		setRecord({ ...updatedRecord });
	}

	const recordLength = record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	const editableWeelyRecordCheckBoxes = [];
	// 今日の記録はHomeでつける
	for (let i = 1; i < recordLength; i++) {
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
							onPress={(nextBoolean) => updateAWeekRecord("tookMedicine", nextBoolean, i)}
						/>
						<CheckBox
							title={null}
							type='bleeding'
							size={"md"}
							isChecked={record.dailyRecord[i].haveBleeding}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							onPress={(nextBoolean) => updateAWeekRecord("haveBleeding", nextBoolean, i)}
						/>
					</>
				)}
			</View>
		);
	}

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
