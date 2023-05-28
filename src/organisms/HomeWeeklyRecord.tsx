import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { RightIcon } from "../atoms/Icons";
import CountRecord from "../molecules/WeeklyCountRecord";
import CheckBox from "../molecules/WeeklyCheckBox";
import SubTitle from "~/atoms/SubTitle";
import { recordState } from "~/hooks";
import {
	countHaveBleedingDays,
	countTakeMedicineDays,
} from "~/utils/countRecord";
import { getWeekArr } from "~/utils/getDateStrings";

export const HomeWeeklyRecord = ({ onPress }: { onPress: () => void }) => {
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

	const recordLength =
		record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	const weekArr = getWeekArr();

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
												{weekArr[index]}
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
													weekArr[
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
