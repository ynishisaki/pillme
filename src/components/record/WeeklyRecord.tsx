import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import SubTitleText from "~/components/common/SubTitleText";
import { ThemedText } from "~/components/common/ThemedText";
import { countHaveBleedingDays, countTakeMedicineDays, hasNoRecordDays } from "~/functions/countRecord";
import { getWeekArr } from "~/functions/getDateStrings";
import { recordState } from "~/states/recordState";
import CheckBox from "../common/CheckBox";

export const WeeklyRecord = () => {
	const [record, setRecord] = useRecoilState(recordState);

	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);

	const recordLength = record.dailyRecord.length;
	const truncateRecordLength = recordLength > 7 ? 7 : recordLength;
	const truncateRecord = [...record.dailyRecord].slice(0, 7).reverse();

	const weekArr = getWeekArr();

	return (
		<ContentLayout title='一週間の記録'>
			<View style={styles.contentLayout}>
				<View style={styles.textLayout}>
					<View>
						<SubTitleText>服薬</SubTitleText>
						<ThemedText type='default'>{`${takeMedicineDays}日目`}</ThemedText>
					</View>
					<View>
						<SubTitleText>出血</SubTitleText>
						<ThemedText type='default'>{`${haveBleedingDays}日目`}</ThemedText>
					</View>
				</View>

				<View style={styles.recordLayout}>
					{truncateRecord.map((record, index) => (
						<View key={index} style={styles.checkBoxLayout}>
							<SubTitleText>{weekArr[(index + (7 - truncateRecordLength)) % 7]}</SubTitleText>
							<View style={{ flex: 1 }}>
								<CheckBox
									type='medicine'
									size={"sm"}
									isChecked={record.tookMedicine || record.isRestPeriod}
									isRestPeriod={record.isRestPeriod}
									readonly
									onPress={() => {}}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<CheckBox
									type='bleeding'
									size={"sm"}
									isChecked={record.haveBleeding || record.isRestPeriod}
									isRestPeriod={record.isRestPeriod}
									readonly
									onPress={() => {}}
								/>
							</View>
						</View>
					))}
				</View>
			</View>
		</ContentLayout>
	);
};

const styles = StyleSheet.create({
	contentLayout: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		columnGap: 10,
	},
	textLayout: {
		marginTop: 10,
		gap: 8,
	},
	recordLayout: {
		flexDirection: "row",
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
		flexDirection: "column",
		rowGap: 5,
	},
});
