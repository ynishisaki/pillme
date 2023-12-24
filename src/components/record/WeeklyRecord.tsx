import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import BaseBlackText from "~/components/common/BaseBlackText";
import ContainerTitleText from "~/components/common/ContainerTitleText";
import SubTitleText from "~/components/common/SubTitleText";
import { countHaveBleedingDays, countTakeMedicineDays, hasNoRecordDays } from "~/functions/countRecord";
import { getWeekArr } from "~/functions/getDateStrings";
import { recordState } from "~/states/recordState";
import { HeaderColor } from "~/styles/color";
import CheckBox from "../common/CheckBox";

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
				<ContainerTitleText>一週間の記録</ContainerTitleText>
			</View>
			<View style={styles.container}>
				<View style={styles.textLayout}>
					<SubTitleText>服薬</SubTitleText>
					<BaseBlackText>{`${takeMedicineDays}日目`}</BaseBlackText>
					<SubTitleText>出血</SubTitleText>
					<BaseBlackText>{`${haveBleedingDays}日目`}</BaseBlackText>
				</View>

				<View style={styles.recordLayout}>
					{truncateRecord.map((record, index) => (
						<View key={index} style={styles.checkBoxLayout}>
							<SubTitleText>{weekArr[(index + (7 - truncateRecordLength)) % 7]}</SubTitleText>
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
});
