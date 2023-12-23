import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import CheckBox from "~/components/CheckBox";
import ContainerTitleText from "~/components/common/ContainerTitleText";
import { hasNoRecordDays } from "~/functions/countRecord";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";
import { HeaderColor } from "~/styles/color";
import { recordType } from "~/types/record";
import { EditIcon } from "../Icons";

export const HomeTodaysRecord = ({ onPress }: { onPress: () => void }) => {
	const [record, setRecord] = useRecoilState(recordState);

	const { tookMedicine, haveBleeding, isRestPeriod } = record.dailyRecord[0];
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	function updateTodayRecord(key: string, nextBoolean: boolean) {
		const updatedRecord: recordType = {
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					[key]: nextBoolean,
				},
				...record.dailyRecord.slice(1),
			],
		};

		const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(updatedRecord);
		setRecord(updatedRecord);

		// 明日から休薬日の場合はアラートを表示
		nextBoolean && isTomorrowStartsRestPeriod && alertTomorrowRestPeriod();
	}

	const alertTomorrowRestPeriod = () =>
		Alert.alert(
			"明日から休薬日です",
			`出血の有無に関わらず${record.initialSheetSettings.stopTakingDays}日間休薬します。`,
			[
				{
					text: "OK",
					style: "default",
				},
			]
		);

	return (
		<>
			<TouchableOpacity onPress={onPress}>
				<View style={styles.titleContainer}>
					<ContainerTitleText>今日の記録</ContainerTitleText>
					<EditIcon hasExclamation={hasNoRecordWithoutToday} />
				</View>
			</TouchableOpacity>

			<View style={styles.contentLayout}>
				<View style={styles.checkBoxLayout}>
					{record.isAsyncStorageLoaded && (
						<>
							<CheckBox
								title='服薬'
								type='medicine'
								size={"lg"}
								isChecked={tookMedicine}
								isRestPeriod={isRestPeriod}
								isNotRecorded={hasNoRecordWithoutToday}
								onPress={() => updateTodayRecord("tookMedicine", !tookMedicine)}
							/>
							<CheckBox
								title='出血'
								type='bleeding'
								size={"lg"}
								isChecked={haveBleeding}
								isRestPeriod={isRestPeriod}
								isNotRecorded={hasNoRecordWithoutToday}
								onPress={() => updateTodayRecord("haveBleeding", !haveBleeding)}
							/>
						</>
					)}
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: HeaderColor,
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
});
