import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";

import { recordState } from "~/../App";
import CheckBox from "~/molecules/PressableCheckBox";
import { showDate } from "~/organisms/TodaysRecord";

export default () => {
	const [record, setRecord] = useRecoilState(recordState);

	function onPressTookMedicine(nextBoolean: boolean, index: number) {
		setRecord({
			...record,
			dailyRecord: [
				...record.dailyRecord.slice(0, index),
				{
					...record.dailyRecord[index],
					tookMedicine: nextBoolean,
				},
				...record.dailyRecord.slice(index + 1),
			],
		});
	}

	function onPressHaveBleeding(nextBoolean: boolean, index: number) {
		setRecord({
			...record,
			dailyRecord: [
				...record.dailyRecord.slice(0, index),
				{
					...record.dailyRecord[index],
					haveBleeding: nextBoolean,
				},
				...record.dailyRecord.slice(index + 1),
			],
		});
	}

	const recordLength =
		record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	const editableWeelyRecordCheckBoxes = [];
	for (let i = 0; i < recordLength; i++) {
		editableWeelyRecordCheckBoxes.push(
			<View key={i} style={styles.horizonalStackLayout}>
				<Text style={styles.text}>
					{showDate(record.dailyRecord[i].date)}
				</Text>

				{record.isAsyncStorageLoaded && (
					<>
						<CheckBox
							title={i === 0 ? "服薬" : null}
							type='medicine'
							size={"md"}
							isChecked={record.dailyRecord[i].tookMedicine}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							onPress={(nextBoolean) =>
								onPressTookMedicine(nextBoolean, i)
							}
						/>
						<CheckBox
							title={i === 0 ? "出血" : null}
							type='bleeding'
							size={"md"}
							isChecked={record.dailyRecord[i].haveBleeding}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							onPress={(nextBoolean) =>
								onPressHaveBleeding(nextBoolean, i)
							}
						/>
					</>
				)}
			</View>
		);
	}

	return (
		<View style={styles.verticalStackLayout}>
			{editableWeelyRecordCheckBoxes}
		</View>
	);
};

const styles = StyleSheet.create({
	verticalStackLayout: {
		flex: 1,
		marginVertical: 20,
		marginHorizontal: "auto",
		width: 230,
		gap: 20,
	},
	horizonalStackLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		// marginTop: 20,
		alignItems: "center",
	},
	text: {
		paddingRight: 20,
	},
});
