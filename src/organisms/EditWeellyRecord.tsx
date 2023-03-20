import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

import { recordState } from "../../App";
import Title from "../molecules/TodaysTitle";
import CheckBox from "../molecules/TodaysCheckBox";

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

	return (
		<View style={styles.container}>
			{/* <View style={styles.titleContainer}> */}
			<Title title={`初期設定`} />

			<View style={styles.checkBoxLayout}>
				{record.isAsyncStorageLoaded && (
					<>
						<CheckBox
							title='服薬'
							isChecked={record.dailyRecord[0].tookMedicine}
							onPress={onPressTookMedicine}
						/>
						<CheckBox
							title='出血'
							isChecked={record.dailyRecord[0].haveBleeding}
							onPress={onPressHaveBleeding}
						/>
					</>
				)}
			</View>
			{/* </View> */}

			{/* <View style={styles.bodyContainer}>
				<EstimatedEndDate estimatedEndDate={estimatedEndDate} />
				<CurrentSheetStatus
					record={record}
					currentSheetTookMedicineLength={
						currentSheetTookMedicineLength
					}
					remainingDays={remainingDays}
				/>
			</View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 330,
		// width: 280,
		// marginBottom: 24,
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
});
