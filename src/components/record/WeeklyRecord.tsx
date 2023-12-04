import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { EditIcon, RightIcon } from "~/components/Icons";
import { recordState } from "~/states/recordState";
import { countHaveBleedingDays, countTakeMedicineDays, hasNoRecordDays } from "~/functions/countRecord";
import { getWeekArr } from "~/functions/getDateStrings";
import { HeaderColor } from "~/styles/color";
import { BackButton } from "../weekly/BackButton";
import CheckBox from "../CheckBox";

export const WeeklyRecord = () => {
	const [record, setRecord] = useRecoilState(recordState);

	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);

	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	const recordLength = record.dailyRecord.length;
	const truncateRecordLength = recordLength > 7 ? 7 : recordLength;
	const truncateRecord = [...record.dailyRecord].slice(0, 7).reverse();

	const weekArr = getWeekArr();

	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>一週間の記録</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.textLayout}>
					<Text style={styles.subtitleText}>服薬</Text>
					<Text style={styles.numberOfDaysText}>{`${takeMedicineDays}日目`}</Text>
					<Text style={styles.subtitleText}>出血</Text>
					<Text style={styles.numberOfDaysText}>{`${haveBleedingDays}日目`}</Text>
				</View>

				<View style={styles.recordLayout}>
					{truncateRecord.map((record, index) => (
						<View key={index} style={styles.checkBoxLayout}>
							<Text style={styles.weekText}>{weekArr[(index + (7 - truncateRecordLength)) % 7]}</Text>
							<View style={{ flex: 1 }}>
								<CheckBox
									title=''
									type='medicine'
									size={"sm"}
									isChecked={record.tookMedicine}
									isRestPeriod={false}
									readonly
									onPress={() => {}}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<CheckBox
									title=''
									type='bleeding'
									size={"sm"}
									isChecked={record.haveBleeding}
									isRestPeriod={false}
									readonly
									onPress={() => {}}
								/>
							</View>
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
	icon: {
		flexDirection: "row",
		alignItems: "center",
	},

	container: {
		margin: 20,
		marginTop: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		columnGap: 10,
	},

	textLayout: {
		marginTop: 10,
	},
	subtitleText: {
		fontSize: 10,
	},
	numberOfDaysText: {
		fontSize: 16,
		marginBottom: 4,
	},

	recordLayout: {
		flexDirection: "row",
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
		// columnGap: 5,
		flexDirection: "column",
		rowGap: 5,
	},
	weekText: {
		fontSize: 10,
	},
});
