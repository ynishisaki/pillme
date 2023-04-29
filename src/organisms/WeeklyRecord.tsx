import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { recordState } from "../../App";
import { RightIcon } from "../atoms/Icons";
import CountRecord from "../molecules/WeeklyCountRecord";
import CheckBox from "../molecules/WeeklyCheckBox";
import SubTitle from "~/atoms/SubTitle";
import { recordType } from "~/types";

// 最後のisRestPeriod=trueの翌日から数える
export function countStartTakeMedicineIndex(record: recordType) {
	const latestIsRestPeriodIndex = record.dailyRecord.findIndex(
		(item) => item.isRestPeriod === true
	);
	const recordLength = record.dailyRecord.length;
	return latestIsRestPeriodIndex > 0
		? latestIsRestPeriodIndex
		: recordLength - 1;
}

export function countTakeMedicineDays(record: recordType) {
	const startTakeMedicineIndex = countStartTakeMedicineIndex(record);

	let count = 0;
	for (let i = startTakeMedicineIndex; i > -1; i--) {
		if (record.dailyRecord[i].tookMedicine === true) {
			count++;
		} else {
			break;
		}
	}
	return count;
}

// jsonから、昨日から直近で出血が何日連続しているか数える
export function countHaveBleedingDays(record: recordType) {
	let count = 0;
	for (let i = 1; i < record.dailyRecord.length; i++) {
		if (record.dailyRecord[i].haveBleeding === true) {
			count++;
		} else {
			break;
		}
	}
	// 今日の出血の有無を調べ、含める
	return record.dailyRecord[0].haveBleeding ? count + 1 : count;
}

export const WeeklyRecord = ({ onPress }: { onPress: () => void }) => {
	const [record, setRecord] = useRecoilState(recordState);

	const takeMedicineDays = countTakeMedicineDays(record);
	const haveBleedingDays = countHaveBleedingDays(record);

	// 休薬の設定
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

	// 休薬の判断
	// 出血が3日以上連続していたら
	if (haveBleedingDays >= record.initialSheetSettings.stopTakingDays) {
		// かつ、連続投与日数が最少の25日以上だったら
		if (
			takeMedicineDays >=
			record.initialSheetSettings.minConteniousTakingDays
		) {
			setRest();
		}
	}
	// 連続投与日数が最大の120日を超えていたら
	else if (
		takeMedicineDays > record.initialSheetSettings.maxConteniousTakingDays
	) {
		setRest();
	}
	// 昨日が休薬日だったら

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
				<SubTitle title='過去一週間分の記録' Icon={RightIcon} />
			</TouchableOpacity>
			<View style={styles.container}>
				<View style={styles.layout}>
					<View style={styles.textLayout}>
						<CountRecord
							title='服薬'
							days={takeMedicineDays}></CountRecord>
						<CountRecord
							title='出血'
							days={haveBleedingDays}></CountRecord>
					</View>

					<View style={styles.recordLayout}>
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
												isRestPeriod={
													record.isRestPeriod
												}
											/>
											<CheckBox
												title='出血'
												isChecked={record.haveBleeding}
												isRestPeriod={
													record.isRestPeriod
												}
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
															(7 -
																recordLength)) %
															7
													]
												}
											</Text>
											<CheckBox
												title='服薬'
												isChecked={record.tookMedicine}
												isRestPeriod={
													record.isRestPeriod
												}
											/>
											<CheckBox
												title='出血'
												isChecked={record.haveBleeding}
												isRestPeriod={
													record.isRestPeriod
												}
											/>
										</View>
									))}
					</View>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	layout: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		margin: "auto",
		marginTop: 10,
		paddingHorizontal: 20,
		maxHeight: 90,
	},
	textLayout: {
		marginTop: 8,
	},
	recordLayout: {
		flexDirection: "row",
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
	},
	weekTextLayout: {
		fontSize: 8,
		color: "#fff",
		marginBottom: -4,
	},
});
