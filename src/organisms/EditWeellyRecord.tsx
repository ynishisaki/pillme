import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";

import { recordState } from "~/../App";
import Title from "~/atoms/Title";
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

	const date = new Date();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	const recentWeekArr = [
		...weekArr.slice((week + 1) % 7),
		...weekArr.slice(0, (week + 1) % 7),
	];

	const recordLength =
		record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	const editableWeelyRecordCheckBoxes = [];
	for (let i = 0; i < recordLength; i++) {
		editableWeelyRecordCheckBoxes.push(
			<View key={i} style={styles.checkBoxLayout}>
				<View style={styles.checkBoxLayout}>
					<Text>{showDate(record.dailyRecord[0].date)}</Text>

					{record.isAsyncStorageLoaded && (
						<>
							<CheckBox
								title='服薬'
								size={"md"}
								isChecked={record.dailyRecord[i].tookMedicine}
								disabled={record.dailyRecord[i].isRestPeriod}
								onPress={(nextBoolean) =>
									onPressTookMedicine(nextBoolean, i)
								}
							/>
							<CheckBox
								title='出血'
								size={"md"}
								isChecked={record.dailyRecord[i].haveBleeding}
								disabled={record.dailyRecord[i].isRestPeriod}
								onPress={(nextBoolean) =>
									onPressHaveBleeding(nextBoolean, i)
								}
							/>
						</>
					)}
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* <View style={styles.titleContainer}> */}
			<Title title={`一週間の記録`} />
			<Text>７日前まで記録をさかのぼって編集することができます</Text>

			{editableWeelyRecordCheckBoxes}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 330,
		// width: 280,
		// marginBottom: 24,
		textAlign: "center",
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
});
