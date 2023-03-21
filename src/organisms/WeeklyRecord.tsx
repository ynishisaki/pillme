import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { recordState } from "../../App";
import { RightIcon } from "../atoms/Icons";
import CountRecord from "../molecules/WeeklyCountRecord";
import CheckBox from "../molecules/WeeklyCheckBox";

export const WeeklyRecord = ({ onPress }: { onPress: () => void }) => {
	const [record, setRecord] = useRecoilState(recordState);

	// タスク：これは連続で飲んだ日数を数えるよう、修正する必要がある
	function countTakeMedicineDays() {
		let count = 0;
		for (let i = 0; i < record.dailyRecord.length; i++) {
			if (record.dailyRecord[i].tookMedicine === true) {
				count++;
			} else {
				break;
			}
		}
		return count;
	}

	const takeMedicineDays = countTakeMedicineDays();

	// jsonから、今日から直近で出血が何日連続しているか数える
	function countHaveBleedingDays() {
		let count = 0;
		for (let i = 0; i < record.dailyRecord.length; i++) {
			if (record.dailyRecord[i].haveBleeding === true) {
				count++;
			} else {
				break;
			}
		}
		return count;
	}
	const haveBleedingDays = countHaveBleedingDays();

	const setRest = () => {
		setRecord((oldRecord) => ({
			...oldRecord,
			dailyRecord: [
				{
					...oldRecord.dailyRecord[0],
					isRestPeriod: true,
				},
				...oldRecord.dailyRecord.slice(1),
			],
		}));
	};

	// 出血が3日連続した場合、休薬する
	if (haveBleedingDays > 3) {
		if (takeMedicineDays > 25) {
			setRest();
		}
	}

	if (takeMedicineDays > 120) {
		setRest();
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
		<>
			<TouchableOpacity onPress={onPress}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>直近一週間の記録</Text>
					<RightIcon />
				</View>
			</TouchableOpacity>
			<View style={styles.bodyContainer}>
				<View style={styles.bodyTextLayout}>
					<CountRecord
						title='服薬'
						days={takeMedicineDays}></CountRecord>
					<CountRecord
						title='出血'
						days={haveBleedingDays}></CountRecord>
				</View>

				<View style={styles.bodyRecordLayout}>
					{recordLength === 7
						? [...record.dailyRecord]
								.slice(0, recordLength)
								.reverse()
								.map((record, index) => (
									<View
										key={index}
										style={styles.checkBoxLayout}>
										<Text style={styles.weekTextLayout}>
											{recentWeekArr[index]}
										</Text>
										<CheckBox
											title='服薬'
											isChecked={record.tookMedicine}
										/>
										<CheckBox
											title='出血'
											isChecked={record.haveBleeding}
										/>
									</View>
								))
						: [...record.dailyRecord]
								.reverse()
								.map((record, index) => (
									<View
										key={index}
										style={styles.checkBoxLayout}>
										<Text style={styles.weekTextLayout}>
											{
												recentWeekArr[
													(index +
														(7 - recordLength)) %
														7
												]
											}
										</Text>
										<CheckBox
											title='服薬'
											isChecked={record.tookMedicine}
										/>
										<CheckBox
											title='出血'
											isChecked={record.haveBleeding}
										/>
									</View>
								))}
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		marginHorizontal: 20,
		height: 30,
		borderBottomColor: "#fff",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 14,
		lineHeight: 30,
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