import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import { WeeklyCheckBox } from "./WeeklyCheckBox";

export const WeeklyRecord = ({ recordProps }: { recordProps: recordType }) => {
	const date = new Date();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	const recentWeekArr = [
		...weekArr.slice((week + 1) % 7),
		...weekArr.slice(0, (week + 1) % 7),
	];

	const recordLength =
		recordProps.dailyRecord.length >= 7
			? 7
			: recordProps.dailyRecord.length;

	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>直近一週間の記録</Text>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.bodyTextLayout}>
					<Text style={styles.subtitleText}>服薬</Text>
					<Text style={styles.numberOfDaysText}>{`${2}2日目`}</Text>
					<Text style={styles.subtitleText}>出血</Text>
					<Text style={styles.numberOfDaysText}>{`${2}2日目`}</Text>
				</View>

				{/* {recentWeekArr.map((week) => (
							<Text>{week}</Text>
						))} */}
				<View style={styles.bodyRecordLayout}>
					{recordLength === 7
						? [...recordProps.dailyRecord]
								.slice(0, 7)
								.reverse()
								.map((record, index) => (
									<View style={styles.weekTextLayout}>
										{/* <Text>{recentWeekArr[index]}</Text>
											<View style={styles.checkBoxLayout}>
												<WeeklyCheckBox
													isChecked={
														record.tookMedicine
													}
												/>
												<WeeklyCheckBox
													isChecked={
														record.haveBleeding
													}
												/>
											</View> */}
									</View>
								))
						: [...recordProps.dailyRecord]
								.slice(0, recordLength)
								.reverse()
								.map((record, index) => (
									<>
										<View style={styles.checkBoxLayout}>
											<Text style={styles.weekTextLayout}>
												{recentWeekArr[index]}
											</Text>
											{/* <View style={{ marginBottom: 4 }}> */}
											<WeeklyCheckBox
												isChecked={record.tookMedicine}
											/>
											{/* </View> */}
											{/* <View style={{ marginBottom: 4 }}> */}
											<WeeklyCheckBox
												isChecked={record.haveBleeding}
											/>
											{/* </View> */}
										</View>
									</>
								))}
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 12,
		marginHorizontal: 20,
		height: 24,
		borderBottomColor: "#fff",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 14,
		color: "#fff",
	},
	bodyContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		marginHorizontal: 20,
	},
	bodyTextLayout: {
		marginTop: 8,
	},

	subtitleText: {
		fontSize: 10,
		color: "#CCCCCC",
	},
	numberOfDaysText: {
		fontSize: 16,
		fontWeight: "600", // semibold
		color: "#fff",
		marginBottom: 4,
	},

	bodyRecordLayout: {
		flexDirection: "row",
		// alignItems: "center",
		// marginTop: 16,
		// marginHorizontal: 20,
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
	},
	weekTextLayout: {
		fontSize: 8,
		color: "#fff",
		marginBottom: 4,
	},
});
