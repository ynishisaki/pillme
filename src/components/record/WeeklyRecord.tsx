import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { RightIcon } from "~/components/Icons";
import CountRecord from "~/components/record/WeeklyCountRecord";
import CheckBox from "~/components/record/WeeklyCheckBox";
import { recordState } from "~/states/recordState";
import { countHaveBleedingDays, countTakeMedicineDays } from "~/functions/countRecord";
import { getWeekArr } from "~/functions/getDateStrings";
import { HeaderColor } from "~/styles/color";

export const WeeklyRecord = ({ onPress }: { onPress: () => void }) => {
	const [record, setRecord] = useRecoilState(recordState);

	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);

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
		if (takeMedicineDays >= record.initialSheetSettings.minConteniousTakingDays) {
			setRest();
		}
	}
	// 連続投与日数が最大の120日を超えていたら
	else if (takeMedicineDays > record.initialSheetSettings.maxConteniousTakingDays) {
		setRest();
	}
	// 昨日が休薬日だったら

	const recordLength = record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	const weekArr = getWeekArr();

	return (
		<>
			<TouchableOpacity onPress={onPress}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>過去一週間分の記録</Text>
					<RightIcon />
				</View>
			</TouchableOpacity>

			<View style={styles.container}>
				<View style={styles.textLayout}>
					<Text style={styles.subtitleText}>服薬</Text>
					<Text style={styles.numberOfDaysText}>{`${takeMedicineDays}日目`}</Text>
					<Text style={styles.subtitleText}>出血</Text>
					<Text style={styles.numberOfDaysText}>{`${haveBleedingDays}日目`}</Text>
				</View>

				<View style={styles.recordLayout}>
					{recordLength === 7
						? [...record.dailyRecord]
								.slice(0, recordLength)
								.reverse()
								.map((record, index) => (
									<View key={index} style={styles.checkBoxLayout}>
										<Text style={styles.weekTextLayout}>{weekArr[index]}</Text>
										<CheckBox
											title='服薬'
											isChecked={record.tookMedicine}
											isRestPeriod={record.isRestPeriod}
										/>
										<CheckBox
											title='出血'
											isChecked={record.haveBleeding}
											isRestPeriod={record.isRestPeriod}
										/>
									</View>
								))
						: [...record.dailyRecord].reverse().map((record, index) => (
								<View key={index} style={styles.checkBoxLayout}>
									<Text style={styles.weekTextLayout}>
										{weekArr[(index + (7 - recordLength)) % 7]}
									</Text>
									<CheckBox
										title='服薬'
										isChecked={record.tookMedicine}
										isRestPeriod={record.isRestPeriod}
									/>
									<CheckBox
										title='出血'
										isChecked={record.haveBleeding}
										isRestPeriod={record.isRestPeriod}
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
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: HeaderColor,
	},
	titleText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	container: {
		margin: 20,
		marginTop: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		columnGap: 10,
	},
	subtitleText: {
		fontSize: 10,
	},
	numberOfDaysText: {
		fontSize: 16,
		marginBottom: 4,
	},
	textLayout: {
		marginTop: 10,
	},
	recordLayout: {
		flexDirection: "row",
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
	},
	weekTextLayout: {
		fontSize: 10,
	},
});
